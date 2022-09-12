// From: https://gist.github.com/msteen/e4828fbf25d6efef73576fc43ac479d2/

import { Text } from "@codemirror/state"
import { TreeCursor } from "@lezer/common"

class StringInput  {
  constructor(  input) {;this.input = input;}

  get length() {
    return this.input.length
  }

  chunk(from) {
    return this.input.slice(from)
  }

  lineChunks = false

  read(from, to) {
    return this.input.slice(from, to)
  }
}

export function sliceType(cursor, input, type) {
  if (cursor.type.id === type) {
    const s = input.read(cursor.from, cursor.to)
    cursor.nextSibling()
    return s
  }
  return null
}

export function isType(cursor, type) {
  const cond = cursor.type.id === type
  if (cond) cursor.nextSibling()
  return cond
}



function cursorNode({ type, from, to }, isLeaf = false) {
  return { type, from, to, isLeaf }
}













export function traverseTree(
  cursor,
  {
    from = -Infinity,
    to = Infinity,
    includeParents = false,
    beforeEnter,
    onEnter,
    onLeave,
  },
) {
  if (!(cursor instanceof TreeCursor)) cursor = cursor.cursor()
  for (;;) {
    let node = cursorNode(cursor)
    let leave = false
    if (node.from <= to && node.to >= from) {
      const enter = !node.type.isAnonymous && (includeParents || (node.from >= from && node.to <= to))
      if (enter && beforeEnter) beforeEnter(cursor)
      node.isLeaf = !cursor.firstChild()
      if (enter) {
        leave = true
        if (onEnter(node) === false) return
      }
      if (!node.isLeaf) continue
    }
    for (;;) {
      node = cursorNode(cursor, node.isLeaf)
      if (leave && onLeave) if (onLeave(node) === false) return
      leave = cursor.type.isAnonymous
      node.isLeaf = false
      if (cursor.nextSibling()) break
      if (!cursor.parent()) return
      leave = true
    }
  }
}

function isChildOf(child, parent) {
  return (
    child.from >= parent.from && child.from <= parent.to && child.to <= parent.to && child.to >= parent.from
  )
}

export function validatorTraversal(
  input,
  { fullMatch = true } = {},
) {
  if (typeof input === "string") input = new StringInput(input)
  const state = {
    valid: true,
    parentNodes: [] ,
    lastLeafTo: 0,
  }
  return {
    state,
    traversal: {
      onEnter(node) {
        state.valid = true
        if (!node.isLeaf) state.parentNodes.unshift(node)
        if (node.from > node.to || node.from < state.lastLeafTo) {
          state.valid = false
        } else if (node.isLeaf) {
          if (state.parentNodes.length && !isChildOf(node, state.parentNodes[0])) state.valid = false
          state.lastLeafTo = node.to
        } else {
          if (state.parentNodes.length) {
            if (!isChildOf(node, state.parentNodes[0])) state.valid = false
          } else if (fullMatch && (node.from !== 0 || node.to !== input.length)) {
            state.valid = false
          }
        }
      },
      onLeave(node) {
        if (!node.isLeaf) state.parentNodes.shift()
      },
    } ,
  }
}

export function validateTree(
  tree,
  input,
  options,
) {
  const { state, traversal } = validatorTraversal(input, options)
  traverseTree(tree, traversal)
  return state.valid
}

var Color; (function (Color) {
  const Red = 31; Color[Color["Red"] = Red] = "Red";
  const Green = 32; Color[Color["Green"] = Green] = "Green";
  const Yellow = 33; Color[Color["Yellow"] = Yellow] = "Yellow";
})(Color || (Color = {}));

function colorize(value, color) {
  // return "\u001b[" + color + "m" + String(value) + "\u001b[39m"
  return String(value)
}



export function printTree(
  cursor,
  input,
  { from, to, start = 0, includeParents } = {},
) {
  const inp = typeof input === "string" ? new StringInput(input) : input
  const text = Text.of(inp.read(0, inp.length).split("\n"))
  const state = {
    output: "",
    prefixes: [] ,
    hasNextSibling: false,
  }
  const validator = validatorTraversal(inp)
  traverseTree(cursor, {
    from,
    to,
    includeParents,
    beforeEnter(cursor) {
      state.hasNextSibling = cursor.nextSibling() && cursor.prevSibling()
    },
    onEnter(node) {
      validator.traversal.onEnter(node)
      const isTop = state.output === ""
      const hasPrefix = !isTop || node.from > 0
      if (hasPrefix) {
        state.output += (!isTop ? "\n" : "") + state.prefixes.join("")
        if (state.hasNextSibling) {
          state.output += " ├─ "
          state.prefixes.push(" │  ")
        } else {
          state.output += " └─ "
          state.prefixes.push("    ")
        }
      }
      const hasRange = node.from !== node.to
      state.output +=
        (node.type.isError || !validator.state.valid ? colorize(node.type.name, Color.Red) : node.type.name) +
        " " +
        (hasRange
          ? "[" +
            colorize(locAt(text, start + node.from), Color.Yellow) +
            ".." +
            colorize(locAt(text, start + node.to), Color.Yellow) +
            "]"
          : colorize(locAt(text, start + node.from), Color.Yellow))
      if (hasRange && node.isLeaf) {
        state.output += ": " + colorize(JSON.stringify(inp.read(node.from, node.to)), Color.Green)
      }
    },
    onLeave(node) {
      validator.traversal.onLeave(node)
      state.prefixes.pop()
    },
  })
  return state.output
}

function locAt(text, pos) {
  const line = text.lineAt(pos)
  return line.number + ":" + (pos - line.from)
}

export function logTree(
  tree,
  input,
  options,
) {
  console.log(printTree(tree, input, options))
}
