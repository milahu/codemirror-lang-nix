'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lr = require('@lezer/lr');
var language = require('@codemirror/language');
var highlight = require('@lezer/highlight');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const StringContent = 1,
  stringInterpolationStart = 75,
  stringEnd = 76,
  IndentedStringContent = 2,
  indentedStringInterpolationStart = 77,
  indentedStringEnd = 78;

/* Hand-written tokenizers for Nix tokens that can't be
   expressed by lezer's built-in tokenizer. */

const braceL = 123, dollar = 36, backslash = 92,
  doublequote = 34, singlequote = 39, newline = 10;

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
const indentedString = new lr.ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input;
    if (next < 0) { // next == -1: end of file
      if (i) {
        input.acceptToken(IndentedStringContent);
      }
      break
    } else if (next == singlequote) {
      if (input.peek(1) == singlequote) {
        if (i == 0) {
          // end of string
          input.advance(2);
          input.acceptToken(indentedStringEnd);
          break
        }
        if (input.peek(2) == dollar && input.peek(3) == braceL) {
          input.advance(2);
        }
        else {
          input.acceptToken(IndentedStringContent);
          // do not advance. '' is needed for indentedStringEnd token
          break
        }
      }
    } else if (next == braceL && afterDollar) {
      if (i == 1) {
        input.acceptToken(indentedStringInterpolationStart, 1);
      }
      else {
        input.acceptToken(IndentedStringContent, -1);
      }
      break
    } else if (next == newline && i > 0) {
      // Break up indentedString strings on lines, to avoid huge tokens
      input.advance(); // add newline to current token
      input.acceptToken(IndentedStringContent);
      break
    }
    afterDollar = next == dollar;
    input.advance();
  }
});

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
const string = new lr.ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input;
    if (next < 0) {
      if (i) input.acceptToken(StringContent);
      break
    } else if (next == doublequote) {
      if (i) input.acceptToken(StringContent);
      else input.acceptToken(stringEnd, 1);
      break
    } else if (next == braceL && afterDollar) {
      if (i == 1) input.acceptToken(stringInterpolationStart, 1);
      else input.acceptToken(StringContent, -1);
      break
    } else if (next == newline && i) {
      // Break up template strings on lines, to avoid huge tokens
      input.advance();
      input.acceptToken(StringContent);
      break
    } else if (next == backslash) {
      input.advance();
    }
    afterDollar = next == dollar;
    input.advance();
  }
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_Identifier = {__proto__:null,assert:180, with:184, let:186, inherit:206, in:214, if:218, then:220, else:222, __curPos:266, __typeOf:270, __isFunction:272, __isInt:274, __isFloat:276, __isString:278, __isBool:280, __isPath:282, __genericClosure:284, __addErrorContext:286, __ceil:288, __floor:290, __tryEval:292, __getEnv:294, __seq:296, __deepSeq:298, __trace:300, __toPath:302, __storePath:304, __pathExists:306, __readFile:308, __findFile:310, __hashFile:312, __readDir:314, __toXML:316, __toJSON:318, __fromJSON:320, __toFile:322, __filterSource:324, __path:326, __attrNames:328, __attrValues:330, __getAttr:332, __unsafeGetAttrPos:334, __hasAttr:336, __isAttrs:338, __listToAttrs:340, __intersectAttrs:342, __catAttrs:344, __functionArgs:346, __mapAttrs:348, __zipAttrsWith:350, __isList:352, __elemAt:354, __head:356, __tail:358, __filter:360, __elem:362, __concatLists:364, __length:366, "__foldl'":368, __any:370, __all:372, __genList:374, __sort:376, __partition:378, __groupBy:380, __concatMap:382, __add:384, __sub:386, __mul:388, __div:390, __bitAnd:392, __bitOr:394, __bitXor:396, __lessThan:398, __substring:400, __stringLength:402, __hashString:404, __match:406, __split:408, __concatStringsSep:410, __replaceStrings:412, __parseDrvName:414, __compareVersions:416, __splitVersion:418, __traceVerbose:420, true:426, false:428, null:430, rec:438, or:444};
const parser$1 = lr.LRParser.deserialize({
  version: 14,
  states: "LQQ]QSOOO/UQWO'#D`O/rOPO'#EaO/}QSO'#CuO/}QSO'#CvO7aQWO'#ElOOQO'#FR'#FROOQO'#Da'#DaOOQO'#Db'#DbOOQO'#Dc'#DcO7wOQO'#G|OOQO'#Dh'#DhOOQO'#Dj'#DjO]QSO'#DlO>[QSO'#DoOOQO'#FU'#FUOOQO'#FT'#FTOEmQWO'#FTOFWQWO'#EpOOQO'#FS'#FSOOQO'#Ep'#EpOOQO'#El'#ElOOQO'#EP'#EPQOQSOOOGpQ`O'#DnOOQO'#D_'#D_OOQO'#FW'#FWOOQO'#Dd'#DdOOQO'#De'#DeOOQO'#Df'#DfO]QSO'#CkO]QSO'#ClOH[QSO'#CmO]QSO'#CtOOQO'#Dg'#DgOHmQSO'#DmO]QSO,58|OHrQSO,59UO]QSO'#CpOOOP'#Ds'#DsOHwOPO,5:{OOQO,5:{,5:{OItQWO,59aOOQO'#D`'#D`OJnQSO'#DnOLQQWO,59bO/}QSO,59cO/}QSO,59dO/}QSO,59eO/}QSO,59fO/}QSO,59gO/}QSO,59hO/}QSO,59iO/}QSO,59jO/}QSO,59kO/}QSO,59lO/}QSO,59nO/}QSO,59oO/}QSO,59pO/}QSO,59qO/}QSO,59rOLkQSO,59mOLvQSO'#DiOOOQ'#Dv'#DvO!%bOQO,5=hOOQO,5=h,5=hO!%mQSO,5:WOOQO,5:Z,5:ZO!%rQSO,5:ZO!,RQSO'#FTOLkQSO,59xOOQO,59w,59wO!,]QSO'#CfOOQO'#ES'#ESO!,nQ`O'#DqO!,vQSO'#CeOOQO'#Ch'#ChO!,vQSO'#CeOOQO'#Ce'#CeO!-OQSO'#CqOOQO'#E`'#E`O!9{QSO'#E_OOQO'#Dr'#DrO!:YQSO'#E^O!:nQSO,59OO!:sQSO'#CnO!:xQSO,5:YOOQO'#Co'#CoO!:}QSO'#CrO!;`QSO,59VO!;eQSO,59WO!;jQSO,59XO!;oQSO,59`OJnQSO,5:XOOQO1G.h1G.hO!;tQ`O1G.pO!<SQWO,59[OOOP-E7q-E7qOOQO1G0g1G0gO!<|QWO1G.}O!=sQWO1G/OO!?XQWO1G/PO!@sQWO1G/QO!B_QWO1G/RO!CyQWO1G/SO!DvQWO1G/TO!EmQWO1G/UO!FdQWO1G/VO!GiQWO1G/WO!IZQWO1G/YOOQO1G/Z1G/ZO!J{QWO1G/[O!LgQWO1G/]O!NRQWO1G/^O!NrQWO'#E_OOQO1G/X1G/XO#!XQpO'#D`O##jQpO'#ElO##qQpO,5:TO##vQpO'#FTO#$QQpO'#EpOOOQ-E7t-E7tOOQO1G3S1G3SOOQO1G/r1G/rOOQO'#Dw'#DwO#%ZQSO1G/uOOQO1G/u1G/uO#,lQWO1G/dO!-OQSO,59RO#-VQSO'#DtO#3sQSO,5:yO#4QQSO'#CfOOQO,5:],5:]OOQO,59P,59PO!,nQ`O,59POOQO-E7o-E7oO#4]QSO,59PO#4eQ!bO'#D`O#4uQSO,59]O#6OQ`O'#ElO#6YQ!bO'#FTO#6gQ!bO'#EpOOQO-E7p-E7pO#7sQSO1G.jO]QSO,59YOOQO1G/t1G/tO#7{QSO'#EhOOQO'#Du'#DuO#8ZQSO,59^O]QSO,59_O]QSO1G.qO]QSO1G.rO]QSO1G.sO]QSO1G.zO#8`QSO1G/sO#8eQSO7+$[OOOP1G.v1G.vO#8jQWO,5:yO#:PQpO,59aO#:jQpO,59bOOOQ1G/o1G/oOOQO-E7u-E7uOOQO7+%a7+%aO#@|QSO1G/dO8SQSO7+%bOOQO1G.m1G.mOOQO,5:`,5:`OOQO-E7r-E7rOOQO1G.k1G.kP#AWQSO'#DqO!,nQ`O1G.kOOQO1G.w1G.wO#A]Q`O,59aO#AyQ`O,59bO]QSO7+$UO#BWQSO7+$ZO#B]QSO1G.tOOQO-E7s-E7sOOQO1G.x1G.xO#BbQSO1G.yOOQO7+$]7+$]OOQO7+$^7+$^OOQO7+$_7+$_O#BgQSO7+$fOOQO7+%_7+%_O#BlQSO<<GvO#CfQpO1G.}O#C|QpO1G/OO#DdQpO1G/PO#EQQpO1G/QO#EnQpO1G/RO#F[QpO1G/SO#FxQpO1G/TO#G`QpO1G/UO#GvQpO1G/VO#G}QpO1G/WO#HkQpO1G/YO#IRQpO1G/[O#IcQpO1G/]O#IsQpO1G/^O$#eQpO'#E_O$#lQpO1G/dOOQO<<H|<<H|OOQO7+$V7+$VO$$kQ`O1G.}O$%UQ`O1G/OO$%oQ`O1G/PO$&`Q`O1G/QO$'PQ`O1G/RO$'pQ`O1G/SO$(aQ`O1G/TO$(zQ`O1G/UO$)eQ`O1G/VO$)oQ`O1G/WO$*`Q`O1G/YO$*yQ`O1G/[O$+^Q`O1G/]O$+qQ`O1G/^O$,UQ!bO'#E_O$,`Q!bO1G/dOOQO<<Gp<<GpO$,mQSO<<GuOOQO7+$`7+$`O$,rQSO7+$eO]QSO<<HQO]QSOAN=bO$4bQpO,5:yO$4iQ!bO,5:yO]QSOAN=aO$4sQSO<<HPOOQOAN=lAN=lOOQOG22|G22|OOQOG22{G22{OOQOAN=kAN=kO$4xQSO'#CuO$5SQSO'#CuO$4xQSO'#CvO$5SQSO'#CvOLvQSO,58|O!-OQSO,58|O$4xQSO,59cO$5SQSO,59cO$4xQSO,59dO$5SQSO,59dO$4xQSO,59eO$5SQSO,59eO$4xQSO,59fO$5SQSO,59fO$4xQSO,59gO$5SQSO,59gO$4xQSO,59hO$5SQSO,59hO$4xQSO,59iO$5SQSO,59iO$4xQSO,59jO$5SQSO,59jO$4xQSO,59kO$5SQSO,59kO$4xQSO,59lO$5SQSO,59lO$4xQSO,59nO$5SQSO,59nO$4xQSO,59oO$5SQSO,59oO$4xQSO,59pO$5SQSO,59pO$4xQSO,59qO$5SQSO,59qO$4xQSO,59rO$5SQSO,59rO$5^QSO,59mO$5iQSO,59mO$5tQSO,59xO$5^QSO,59xO$5iQSO,59xOLvQSO1G.qO!-OQSO1G.qOLvQSO1G.rO!-OQSO1G.rOLvQSO1G.sO!-OQSO1G.sO8SQSO7+%bO8SQSO7+%bO8SQSO7+%bOLvQSO7+$UO!-OQSO7+$UOLvQSO<<HQO!-OQSO<<HQOLvQSOAN=bO!-OQSOAN=bOLvQSOAN=aO!-OQSOAN=aO$6PQSO,59VO$6UQSO,59VO$6ZQSO,59WO$6`QSO,59WO$6eQSO,59XO$6jQSO,59XO$6oQSO1G.jO$6wQSO1G.jO$7PQSO7+$fO$7UQSO7+$fO$7ZQSO<<GvO$7`QSO<<GvO$7eQSO<<GuO$7jQSO<<GuO]QSO'#CkO]QSO'#CkO]QSO'#ClO]QSO'#ClOH[QSO'#CmOH[QSO'#CmO$7oQSO,59OO$7tQSO,59OO]QSO1G.zO]QSO1G.zO$7yQSO7+$[O$8OQSO7+$[O$8TQSO7+$ZO$8YQSO7+$ZOGpQ`O'#DnOGpQ`O'#DnO$8_QSO,59`O$8dQSO,59`O!;tQ`O1G.pO!;tQ`O1G.pO]QSO'#CtO]QSO'#CtO$8iQSO,59UO$8nQSO,59U",
  stateData: "$8w~O!rOSROSSOS~OVPO{UO|UO}UO!OUO!_[O!uhO!|nO#OoO#PpO#UQO#]]O#aqO#eRO#fSO#yiO#{jO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kWO%lXO%mkO%nlO%omO%qYO%ssO%t^O~OV!SX{!SX|!SX}!SX!O!SX!_!SX!u!SX!w!SX#U!SX#X!SX#]!SX#f!SX#g!SX#h!SX#i!SX#j!SX#k!SX#l!SX#m!SX#n!SX#o!SX#p!SX#q!SX#r!SX#s!SX#t!SX#y!SX#{!SX#|!SX#}!SX$O!SX$P!SX$Q!SX$R!SX$S!SX$T!SX$U!SX$V!SX$W!SX$X!SX$Y!SX$Z!SX$[!SX$]!SX$^!SX$_!SX$`!SX$a!SX$b!SX$c!SX$d!SX$e!SX$f!SX$g!SX$h!SX$i!SX$j!SX$k!SX$l!SX$m!SX$n!SX$o!SX$p!SX$q!SX$r!SX$s!SX$t!SX$u!SX$v!SX$w!SX$x!SX$y!SX$z!SX${!SX$|!SX$}!SX%O!SX%P!SX%Q!SX%R!SX%S!SX%T!SX%U!SX%V!SX%W!SX%X!SX%Y!SX%Z!SX%[!SX%]!SX%^!SX%_!SX%`!SX%a!SX%b!SX%c!SX%d!SX%e!SX%f!SX%g!SX%h!SX%i!SX%j!SX%k!SX%l!SX%m!SX%n!SX%o!SX%q!SX%s!SX%t!SX~O!ttO!{uO!l!SX#^!SX!}!SX#b!SX#V!SX#c!SX~P'wOPwO!mvO!nyO~OV{O{UO|UO}UO!OUO!_[O!u|O#UQO#]]O#eRO#fSO#yiO#{jO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kWO%lXO%mkO%nlO%omO%qYO%ssO%t^O~O!w!_O#f!ZO#g!OO#h!PO#i!QO#j!RO#k!SO#l!TO#m!UO#n!VO#o!WO#p!XO#q!YO#r![O#s!]O#t!^O~O!l#`X#^#`X!}#`X#b#`X#V#`X#c#`X~P6]OQ!aO!o!`O!p!cO~OV{O{UO|UO}UO!OUO!_[O!u|O#UQO#]]O#yiO#{jO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kWO%lXO%mkO%nlO%omO%qYO%ssO%t^O~O%u!eO~P8SOV#wX{#wX|#wX}#wX!O#wX!_#wX!u#wX!w#wX#U#wX#]#wX#f#wX#g#wX#h#wX#i#wX#j#wX#k#wX#l#wX#m#wX#n#wX#o#wX#p#wX#q#wX#r#wX#s#wX#t#wX#y#wX#{#wX#|#wX#}#wX$O#wX$P#wX$Q#wX$R#wX$S#wX$T#wX$U#wX$V#wX$W#wX$X#wX$Y#wX$Z#wX$[#wX$]#wX$^#wX$_#wX$`#wX$a#wX$b#wX$c#wX$d#wX$e#wX$f#wX$g#wX$h#wX$i#wX$j#wX$k#wX$l#wX$m#wX$n#wX$o#wX$p#wX$q#wX$r#wX$s#wX$t#wX$u#wX$v#wX$w#wX$x#wX$y#wX$z#wX${#wX$|#wX$}#wX%O#wX%P#wX%Q#wX%R#wX%S#wX%T#wX%U#wX%V#wX%W#wX%X#wX%Y#wX%Z#wX%[#wX%]#wX%^#wX%_#wX%`#wX%a#wX%b#wX%c#wX%d#wX%e#wX%f#wX%g#wX%h#wX%i#wX%j#wX%k#wX%l#wX%m#wX%n#wX%o#wX%q#wX%s#wX%t#wX~O#X!hO!l#wX#^#wX!}#wX#b#wX#V#wX#c#wX~P>cO!l#dX!w#dX#f#dX#g#dX#h#dX#i#dX#j#dX#k#dX#l#dX#m#dX#n#dX#o#dX#p#dX#q#dX#r#dX#s#dX#t#dX#^#dX!}#dX#b#dX#V#dX#c#dX~P8SOV!jO!x!lO!y!nO#UQO#W!qO#Z!zO!zXP!z#QP~OV!sO#UQO#W!qO#Z!zO#_#QP~O!u#PO~O!u#RO~OPwO!mvO!n#UO~O#gia#hia#iia#jia#kia#lia#mia#nia#oia#pia~O!w!_O#f!ZO#q!YO#r![O#s!]O#t!^O!lia#^ia!}ia#bia#Via#cia~PISOV!sO#UQO#W!qO#Z!zO!z#QP~O!wja#gja#hja#ija#jja#kja#lja#mja#nja#oja#pja#qja#rja#sja#tja~O#f!ZO!lja#^ja!}ja#bja#Vja#cja~PKPOV#fO#UQO#W!qO~OV#hO{UO|UO}UO!OUO!_[O!u'|O!|'nO#O'pO#P'rO#UQO#]]O#a(SO#e&SO#f&UO#yiO#{jO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kWO%lXO%mkO%nlO%omO%qYO%ssO%t^O~OQ!aO!o!`O!p#nO~O#^#oO~O%u#rO~P8SOV#wX{#wX|#wX}#wX!O#wX!_#wX!u#wX#U#wX#]#wX#y#wX#{#wX#|#wX#}#wX$O#wX$P#wX$Q#wX$R#wX$S#wX$T#wX$U#wX$V#wX$W#wX$X#wX$Y#wX$Z#wX$[#wX$]#wX$^#wX$_#wX$`#wX$a#wX$b#wX$c#wX$d#wX$e#wX$f#wX$g#wX$h#wX$i#wX$j#wX$k#wX$l#wX$m#wX$n#wX$o#wX$p#wX$q#wX$r#wX$s#wX$t#wX$u#wX$v#wX$w#wX$x#wX$y#wX$z#wX${#wX$|#wX$}#wX%O#wX%P#wX%Q#wX%R#wX%S#wX%T#wX%U#wX%V#wX%W#wX%X#wX%Y#wX%Z#wX%[#wX%]#wX%^#wX%_#wX%`#wX%a#wX%b#wX%c#wX%d#wX%e#wX%f#wX%g#wX%h#wX%i#wX%j#wX%k#wX%l#wX%m#wX%n#wX%o#wX%q#wX%s#wX%t#wX~O#X&zO%u#wX~P!%yO!w#tO#X#uO!xYX!zYX#Y#RX~OV#wO!y!nO~O!x#zO!zXX~OV#}O{UO|UO}UO!OUO!_[O!u'}O!|'oO#O'qO#P'sO#UQO#]]O#a(TO#e&TO#f&VO#yiO#{jO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kWO%lXO%mkO%nlO%omO%qYO%ssO%t^O~O#X#uOV#RX!}#RX#U#RX{#RX|#RX}#RX!O#RX!_#RX!u#RX#]#RX#y#RX#{#RX#|#RX#}#RX$O#RX$P#RX$Q#RX$R#RX$S#RX$T#RX$U#RX$V#RX$W#RX$X#RX$Y#RX$Z#RX$[#RX$]#RX$^#RX$_#RX$`#RX$a#RX$b#RX$c#RX$d#RX$e#RX$f#RX$g#RX$h#RX$i#RX$j#RX$k#RX$l#RX$m#RX$n#RX$o#RX$p#RX$q#RX$r#RX$s#RX$t#RX$u#RX$v#RX$w#RX$x#RX$y#RX$z#RX${#RX$|#RX$}#RX%O#RX%P#RX%Q#RX%R#RX%S#RX%T#RX%U#RX%V#RX%W#RX%X#RX%Y#RX%Z#RX%[#RX%]#RX%^#RX%_#RX%`#RX%a#RX%b#RX%c#RX%d#RX%e#RX%f#RX%g#RX%h#RX%i#RX%j#RX%k#RX%l#RX%m#RX%n#RX%o#RX%q#RX%s#RX%t#RX%v#RX~O#Y#RX#W#RX%u#RX~P!3jOV!sO#UQO#W!qO#Z!zO!z#QX#_#QX~O!z$TO~O#Y$UO~O!z$VO~OV!sO#UQO#W!qO#]$ZO!}#[P~O!}$[O~O!}$]O~O#_$^O~O#b$_O~OV#wO!x!lO!y!nO!zXP~O#V$bO~O!w!_O#f!ZO#i!QO#j!RO#k!SO#l!TO#p!XO#q!YO#r![O#s!]O#t!^O~O!lki#gki#hki#mki#nki#oki#^ki!}ki#bki#Vki#cki~P!<XO!lli#gli#hli#mli#nli#oli#^li!}li#bli#Vli#cli~P!<XO#gmi#hmi#imi#jmi#kmi#lmi#mmi#nmi#omi~O!w!_O#f!ZO#p!XO#q!YO#r![O#s!]O#t!^O!lmi#^mi!}mi#bmi#Vmi#cmi~P!>jO#gni#hni#ini#jni#kni#lni#mni#nni#oni~O!w!_O#f!ZO#p!XO#q!YO#r![O#s!]O#t!^O!lni#^ni!}ni#bni#Vni#cni~P!@UO#goi#hoi#ioi#joi#koi#loi#moi#noi#ooi~O!w!_O#f!ZO#p!XO#q!YO#r![O#s!]O#t!^O!loi#^oi!}oi#boi#Voi#coi~P!ApO#gpi#hpi#ipi#jpi#kpi#lpi#mpi#npi#opi~O!w!_O#f!ZO#p!XO#q!YO#r![O#s!]O#t!^O!lpi#^pi!}pi#bpi#Vpi#cpi~P!C[O#g!OO#h!PO!lqi#mqi#nqi#oqi#^qi!}qi#bqi#Vqi#cqi~P!<XO#g!OO#h!PO#m!UO!lri#nri#ori#^ri!}ri#bri#Vri#cri~P!<XO!lsi#^si!}si#bsi#Vsi#csi~P6]O#gti#hti#iti#jti#kti#lti#mti#nti#oti~O!w!_O#f!ZO#p!XO#q!YO#r![O#s!]O#t!^O!lti#^ti!}ti#bti#Vti#cti~P!FzO#gvi#hvi#ivi#jvi#kvi#lvi#mvi#nvi#ovi#pvi#qvi~O!w!_O#f!ZO#r![O#s!]O#t!^O!lvi#^vi!}vi#bvi#Vvi#cvi~P!HfO#gxi#hxi#ixi#jxi#kxi#lxi#mxi#nxi#oxi#pxi#qxi#rxi#sxi~O!w!_O#f!ZO#t!^O!lxi#^xi!}xi#bxi#Vxi#cxi~P!JQO#gyi#hyi#iyi#jyi#kyi#lyi#myi#nyi#oyi#pyi#qyi#ryi#syi~O!w!_O#f!ZO#t!^O!lyi#^yi!}yi#byi#Vyi#cyi~P!KlO#gzi#hzi#izi#jzi#kzi#lzi#mzi#nzi#ozi#pzi#qzi#rzi#szi~O!w!_O#f!ZO#t!^O!lzi#^zi!}zi#bzi#Vzi#czi~P!MWO!l#RX!w#RX#f#RX#g#RX#h#RX#i#RX#j#RX#k#RX#l#RX#m#RX#n#RX#o#RX#p#RX#q#RX#r#RX#s#RX#t#RX#^#RX#b#RX#V#RX#c#RX~P!3jO!t&WO!{(UO%r!SX~P'wO!w&xO#f&pO#g&YO#h&[O#i&^O#j&`O#k&bO#l&dO#m&fO#n&hO#o&jO#p&lO#q&nO#r&rO#s&tO#t&vO~O%r#`X~P#!fO%r$fO~O#X&{O%r#wX~P>cO!w#dX#f#dX#g#dX#h#dX#i#dX#j#dX#k#dX#l#dX#m#dX#n#dX#o#dX#p#dX#q#dX#r#dX#s#dX#t#dX%r#dX~P8SO%u$hO~P8SOV!Qi{!Qi|!Qi}!Qi!O!Qi!_!Qi!u!Qi!w!Qi#U!Qi#]!Qi#f!Qi#g!Qi#h!Qi#i!Qi#j!Qi#k!Qi#l!Qi#m!Qi#n!Qi#o!Qi#p!Qi#q!Qi#r!Qi#s!Qi#t!Qi#y!Qi#{!Qi#|!Qi#}!Qi$O!Qi$P!Qi$Q!Qi$R!Qi$S!Qi$T!Qi$U!Qi$V!Qi$W!Qi$X!Qi$Y!Qi$Z!Qi$[!Qi$]!Qi$^!Qi$_!Qi$`!Qi$a!Qi$b!Qi$c!Qi$d!Qi$e!Qi$f!Qi$g!Qi$h!Qi$i!Qi$j!Qi$k!Qi$l!Qi$m!Qi$n!Qi$o!Qi$p!Qi$q!Qi$r!Qi$s!Qi$t!Qi$u!Qi$v!Qi$w!Qi$x!Qi$y!Qi$z!Qi${!Qi$|!Qi$}!Qi%O!Qi%P!Qi%Q!Qi%R!Qi%S!Qi%T!Qi%U!Qi%V!Qi%W!Qi%X!Qi%Y!Qi%Z!Qi%[!Qi%]!Qi%^!Qi%_!Qi%`!Qi%a!Qi%b!Qi%c!Qi%d!Qi%e!Qi%f!Qi%g!Qi%h!Qi%i!Qi%j!Qi%k!Qi%l!Qi%m!Qi%n!Qi%o!Qi%q!Qi%s!Qi%t!Qi~O%v$jO!l!Qi#^!Qi!}!Qi#b!Qi#V!Qi#c!Qi~P#%bOV$lO#UQO#W!qO~O#X#uOV#Ra!}#Ra#U#Ra{#Ra|#Ra}#Ra!O#Ra!_#Ra!u#Ra#]#Ra#y#Ra#{#Ra#|#Ra#}#Ra$O#Ra$P#Ra$Q#Ra$R#Ra$S#Ra$T#Ra$U#Ra$V#Ra$W#Ra$X#Ra$Y#Ra$Z#Ra$[#Ra$]#Ra$^#Ra$_#Ra$`#Ra$a#Ra$b#Ra$c#Ra$d#Ra$e#Ra$f#Ra$g#Ra$h#Ra$i#Ra$j#Ra$k#Ra$l#Ra$m#Ra$n#Ra$o#Ra$p#Ra$q#Ra$r#Ra$s#Ra$t#Ra$u#Ra$v#Ra$w#Ra$x#Ra$y#Ra$z#Ra${#Ra$|#Ra$}#Ra%O#Ra%P#Ra%Q#Ra%R#Ra%S#Ra%T#Ra%U#Ra%V#Ra%W#Ra%X#Ra%Y#Ra%Z#Ra%[#Ra%]#Ra%^#Ra%_#Ra%`#Ra%a#Ra%b#Ra%c#Ra%d#Ra%e#Ra%f#Ra%g#Ra%h#Ra%i#Ra%j#Ra%k#Ra%l#Ra%m#Ra%n#Ra%o#Ra%q#Ra%s#Ra%t#Ra%v#Ra~O#Y#Ra#W#Ra%u#Ra~P#-bO!w#tO!xYX!zYX~O!x$pO!zXa~O!t&XO!{(VO!z!SX!x!SX~P'wO!z$qO~O!w&yO#f&qO#g&ZO#h&]O#i&_O#j&aO#k&cO#l&eO#m&gO#n&iO#o&kO#p&mO#q&oO#r&sO#s&uO#t&wO~O!z#`X!x#`X~P#4zO#X&|O!z#wX!x#wX~P>cO!w#dX!z#dX#f#dX#g#dX#h#dX#i#dX#j#dX#k#dX#l#dX#m#dX#n#dX#o#dX#p#dX#q#dX#r#dX#s#dX#t#dX!x#dX~P8SO!t$tO!{$uO~OV!sO#UQO#W!qO!}#[X~O!}$xO~O!z%OO~O!z%PO~O!l#Ra!w#Ra#f#Ra#g#Ra#h#Ra#i#Ra#j#Ra#k#Ra#l#Ra#m#Ra#n#Ra#o#Ra#p#Ra#q#Ra#r#Ra#s#Ra#t#Ra#^#Ra#b#Ra#V#Ra#c#Ra~P#-bO!w&xO#f&pO#q&nO#r&rO#s&tO#t&vO%ria~PISO#f&pO%rja~PKPOV!Qi{!Qi|!Qi}!Qi!O!Qi!_!Qi!u!Qi#U!Qi#]!Qi#y!Qi#{!Qi#|!Qi#}!Qi$O!Qi$P!Qi$Q!Qi$R!Qi$S!Qi$T!Qi$U!Qi$V!Qi$W!Qi$X!Qi$Y!Qi$Z!Qi$[!Qi$]!Qi$^!Qi$_!Qi$`!Qi$a!Qi$b!Qi$c!Qi$d!Qi$e!Qi$f!Qi$g!Qi$h!Qi$i!Qi$j!Qi$k!Qi$l!Qi$m!Qi$n!Qi$o!Qi$p!Qi$q!Qi$r!Qi$s!Qi$t!Qi$u!Qi$v!Qi$w!Qi$x!Qi$y!Qi$z!Qi${!Qi$|!Qi$}!Qi%O!Qi%P!Qi%Q!Qi%R!Qi%S!Qi%T!Qi%U!Qi%V!Qi%W!Qi%X!Qi%Y!Qi%Z!Qi%[!Qi%]!Qi%^!Qi%_!Qi%`!Qi%a!Qi%b!Qi%c!Qi%d!Qi%e!Qi%f!Qi%g!Qi%h!Qi%i!Qi%j!Qi%k!Qi%l!Qi%m!Qi%n!Qi%o!Qi%q!Qi%s!Qi%t!Qi~O%v'TO%u!Qi~P#:tOV#wO~O!w&yO#f&qO#q&oO#r&sO#s&uO#t&wO!zia!xia~PISO#f&qO!zja!xja~PKPOV%uO~O!}%vO~O#^%wO~O#c%xO~O!t%yO~O!w&xO#f&pO#i&^O#j&`O#k&bO#l&dO#p&lO#q&nO#r&rO#s&tO#t&vO~O#gki#hki#mki#nki#oki%rki~P#BqO#gli#hli#mli#nli#oli%rli~P#BqO!w&xO#f&pO#p&lO#q&nO#r&rO#s&tO#t&vO%rmi~P!>jO!w&xO#f&pO#p&lO#q&nO#r&rO#s&tO#t&vO%rni~P!@UO!w&xO#f&pO#p&lO#q&nO#r&rO#s&tO#t&vO%roi~P!ApO!w&xO#f&pO#p&lO#q&nO#r&rO#s&tO#t&vO%rpi~P!C[O#g&YO#h&[O#mqi#nqi#oqi%rqi~P#BqO#g&YO#h&[O#m&fO#nri#ori%rri~P#BqO%rsi~P#!fO!w&xO#f&pO#p&lO#q&nO#r&rO#s&tO#t&vO%rti~P!FzO!w&xO#f&pO#r&rO#s&tO#t&vO%rvi~P!HfO!w&xO#f&pO#t&vO%rxi~P!JQO!w&xO#f&pO#t&vO%ryi~P!KlO!w&xO#f&pO#t&vO%rzi~P!MWO#X#uO!w#RX#f#RX#g#RX#h#RX#i#RX#j#RX#k#RX#l#RX#m#RX#n#RX#o#RX#p#RX#q#RX#r#RX#s#RX#t#RXV#RX{#RX|#RX}#RX!O#RX!_#RX!u#RX#U#RX#]#RX#y#RX#{#RX#|#RX#}#RX$O#RX$P#RX$Q#RX$R#RX$S#RX$T#RX$U#RX$V#RX$W#RX$X#RX$Y#RX$Z#RX$[#RX$]#RX$^#RX$_#RX$`#RX$a#RX$b#RX$c#RX$d#RX$e#RX$f#RX$g#RX$h#RX$i#RX$j#RX$k#RX$l#RX$m#RX$n#RX$o#RX$p#RX$q#RX$r#RX$s#RX$t#RX$u#RX$v#RX$w#RX$x#RX$y#RX$z#RX${#RX$|#RX$}#RX%O#RX%P#RX%Q#RX%R#RX%S#RX%T#RX%U#RX%V#RX%W#RX%X#RX%Y#RX%Z#RX%[#RX%]#RX%^#RX%_#RX%`#RX%a#RX%b#RX%c#RX%d#RX%e#RX%f#RX%g#RX%h#RX%i#RX%j#RX%k#RX%l#RX%m#RX%n#RX%o#RX%q#RX%s#RX%t#RX%v#RX~O%r#RX~P#JTO%v'UO%r!Qi~P#%bO!w&yO#f&qO#i&_O#j&aO#k&cO#l&eO#p&mO#q&oO#r&sO#s&uO#t&wO~O!zki#gki#hki#mki#nki#oki!xki~P$#vO!zli#gli#hli#mli#nli#oli!xli~P$#vO!w&yO#f&qO#p&mO#q&oO#r&sO#s&uO#t&wO!zmi!xmi~P!>jO!w&yO#f&qO#p&mO#q&oO#r&sO#s&uO#t&wO!zni!xni~P!@UO!w&yO#f&qO#p&mO#q&oO#r&sO#s&uO#t&wO!zoi!xoi~P!ApO!w&yO#f&qO#p&mO#q&oO#r&sO#s&uO#t&wO!zpi!xpi~P!C[O#g&ZO#h&]O!zqi#mqi#nqi#oqi!xqi~P$#vO#g&ZO#h&]O#m&gO!zri#nri#ori!xri~P$#vO!zsi!xsi~P#4zO!w&yO#f&qO#p&mO#q&oO#r&sO#s&uO#t&wO!zti!xti~P!FzO!w&yO#f&qO#r&sO#s&uO#t&wO!zvi!xvi~P!HfO!w&yO#f&qO#t&wO!zxi!xxi~P!JQO!w&yO#f&qO#t&wO!zyi!xyi~P!KlO!w&yO#f&qO#t&wO!zzi!xzi~P!MWO!z#RX!x#RX~P#JTO%v'VO!z!Qi!x!Qi~P#%bO!t%|O~OV!sO#UQO#W!qO!}#[P~O#X#uO!w#Ra#f#Ra#g#Ra#h#Ra#i#Ra#j#Ra#k#Ra#l#Ra#m#Ra#n#Ra#o#Ra#p#Ra#q#Ra#r#Ra#s#Ra#t#RaV#Ra{#Ra|#Ra}#Ra!O#Ra!_#Ra!u#Ra#U#Ra#]#Ra#y#Ra#{#Ra#|#Ra#}#Ra$O#Ra$P#Ra$Q#Ra$R#Ra$S#Ra$T#Ra$U#Ra$V#Ra$W#Ra$X#Ra$Y#Ra$Z#Ra$[#Ra$]#Ra$^#Ra$_#Ra$`#Ra$a#Ra$b#Ra$c#Ra$d#Ra$e#Ra$f#Ra$g#Ra$h#Ra$i#Ra$j#Ra$k#Ra$l#Ra$m#Ra$n#Ra$o#Ra$p#Ra$q#Ra$r#Ra$s#Ra$t#Ra$u#Ra$v#Ra$w#Ra$x#Ra$y#Ra$z#Ra${#Ra$|#Ra$}#Ra%O#Ra%P#Ra%Q#Ra%R#Ra%S#Ra%T#Ra%U#Ra%V#Ra%W#Ra%X#Ra%Y#Ra%Z#Ra%[#Ra%]#Ra%^#Ra%_#Ra%`#Ra%a#Ra%b#Ra%c#Ra%d#Ra%e#Ra%f#Ra%g#Ra%h#Ra%i#Ra%j#Ra%k#Ra%l#Ra%m#Ra%n#Ra%o#Ra%q#Ra%s#Ra%t#Ra%v#Ra~O%r#Ra~P$-QO!z#Ra!x#Ra~P$-QO!}&RO~O#e&SO#f&UO~P8SO#e&TO#f&VO~P8SOV%`O#UQO#W!qO~OV%rO#UQO#W!qO~OV!sO#UQO#W!qO~O!}&}O~O!}'OO~O!}'PO~O!}'QO~O#_'RO~O#_'SO~O!t'WO!{'zO~O!t'XO!{'{O~O#c'YO~O#c'ZO~O!t'[O~O!t']O~O!t'^O~O!t'_O~O!z'fO~O!z'gO~O!z'jO~O!z'kO~OV'lO~OV'mO~O#b'vO~O#b'wO~O!u(QO~O!u(RO~O!O!O#X~",
  goto: "Kb%qPPPPPP%rP%r&r'U'U'b%r%r%r%r%r's(O(f(O's's(j)j)j)j)j)j)j)j)j)j)j)j)j)j)j)j)j)j)jPPPP+o-t0T0T0T0T0T0T0T0T0T0T2d0TP0T0T0T0T-t2h2w3U3[3o3v3|PPPPPPP4SPP6[PPPPPPPPP6j6|7o8_PPPPPP;UPPP%rPPP;[PPPPPPPPPPPPPPPP0T?kAtD]PFrPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIR!{fO]noqtv!`!q#t$U$Z$[$]$^$_$t%x%y%|&W&X&}'O'P'Q'R'S'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(TQ!vhQ$a#RQ't'|Q'u'}Q'x(QR'y(Re!kh!l#R#z$o$p'|'}(Q(R[!ph#R'|'}(Q(RQ#y!lQ$n#zR%c$pc!thp|!u#P'r's'|'}y!rhp|!_!h!u!z#P#u$W%w&x&y&z&{&|'r's'|'}TwQx!{eO]noqtv!`!q#t$U$Z$[$]$^$_$t%x%y%|&W&X&}'O'P'Q'R'S'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(T%VdORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!q#t$U$Z$[$]$^$_$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(T%VcORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!q#t$U$Z$[$]$^$_$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(T%k`ORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#l#q#t$R$U$Z$[$]$^$_$j$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(T%k_ORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#l#q#t$R$U$Z$[$]$^$_$j$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(TT!aY!b[!mh#R'|'}(Q(RS#{!m#|R#|!o`!uhp|#P'r's'|'}R$S!uQxQR#TxS#v!j!sQ$c#fW$m#v$c%z%{Q%z%`R%{%rS$W!z%wR$w$WQ!bYR#m!bQ#q!fR$g#qQgOQ!d]Q!{nQ!|oQ#OqU#Qt&W&XQ#SvQ#j!`Q$O!qQ$k#tQ$v$UQ$y$ZU$z$[&}'OU${$]'P'QU$|$^'R'SQ$}$_U%t$t'W'XU&O%x'Y'ZU&P%y'[']U&Q%|'^'_Q'`'nQ'a'oQ'b'pQ'c'qQ'h'vQ'i'wQ(O(SR(P(T[!oh#R'|'}(Q(RX#x!l#z$o$pW!xh|'|'}Q!}pQ$`#PQ'd'rR'e'sb!whp|!u#P'r's'|'}U#g!_&x&yQ#s!hU$X!z$W%wQ$i&zQ%a&{R%s&|j!shp|!u!z#P$W%w&z'r's'|'}S#f!_!hQ$l#uS%`&x&{T%r&y&|%jrORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#l#q#t$R$U$Z$[$]$^$_$j$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(Ty!yhp|!_!h!u!z#P#u$W%w&x&y&z&{&|'r's'|'}Q$Y!zR%}%w!STO]noqtv$U$Z$[$]$^$_$t%x%y%|'n'o'p'q'v'w(S(TQzRQ}SQ#V!OQ#W!PQ#X!QQ#Y!RQ#Z!SQ#[!TQ#]!UQ#^!VQ#_!WQ#`!XQ#a!YU#b!Z&p&qQ#c![Q#d!]Q#e!^b#i!`&W&}'P'R'W'Y'['^d$P!q#t&X'O'Q'S'X'Z']'_Q$d&SQ$e&UQ$r&TQ$s&VQ%Q&YQ%R&[Q%S&^Q%T&`Q%U&bQ%V&dQ%W&fQ%X&hQ%Y&jQ%Z&lQ%[&nQ%]&rQ%^&tQ%_&vQ%d&ZQ%e&]Q%f&_Q%g&aQ%h&cQ%i&eQ%j&gQ%k&iQ%l&kQ%m&mQ%n&oQ%o&sQ%p&uR%q&w!vbORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^$U$Z$[$]$^$_$t%x%y%|'n'o'p'q'v'w(S(T!U#l!`&S&U&W&Y&[&^&`&b&d&f&h&j&l&n&p&r&t&v&}'P'R'W'Y'['^!X$R!q#t&T&V&X&Z&]&_&a&c&e&g&i&k&m&o&q&s&u&w'O'Q'S'X'Z']'_%UcORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!q#t$U$Z$[$]$^$_$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(TQ!f^U!ib#l$RS#p!f#qX%b$j'T'U'V!zaORS]bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^$U$Z$[$]$^$_$j$t%x%y%|'n'o'p'q'v'w(S(TW!g^!f#q'T!Y#k!`#l&S&U&W&Y&[&^&`&b&d&f&h&j&l&n&p&r&t&v&}'P'R'U'W'Y'['^!]$Q!q#t$R&T&V&X&Z&]&_&a&c&e&g&i&k&m&o&q&s&u&w'O'Q'S'V'X'Z']'_%kVORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#l#q#t$R$U$Z$[$]$^$_$j$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(T%kZORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#l#q#t$R$U$Z$[$]$^$_$j$t%x%y%|&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'n'o'p'q'v'w(S(T",
  nodeNames: "⚠ StringContent IndentedStringContent Comment CommentBlock Nix Lambda Identifier Lambda Formals Formal Formal FormalsRest Lambda Lambda Assert With Let Attr String StringInterpolation AttrInterpolation AttrInherit AttrInheritFrom If Not Neg Eq NEq LT LE GT GE And Or Imply Update HasAttr Add Sub Mul Div Concat PathLibrary PathAbsolute PathHome PathRelative Call Select Pos Var Primop Int Float TRUE FALSE NULL String IndentedString IndentedStringInterpolation String URI Parens RecSet Set List SelectOr",
  maxTerm: 222,
  skippedNodes: [0,3,4],
  repeatNodeCount: 7,
  tokenData: ">r~R!QX^$Xpq$Xqr$|rs%Zst%`tu%kvw%vwx&Rxy&^yz&cz{&h{|&m|})m}!O)r!O!P*i!P!Q.g!Q![1Y![!]2d!]!^2i!^!_2n!_!`4o!`!a4|!a!b5Z!b!c5`!c!}5e!}#O;Q#P#Q;V#R#S:]#T#o5e#o#p;[#p#q;a#q#r;l#r#s;u#y#z$X$f$g$X$g#BY6]#BY#BZ=S#BZ$IS6]$IS$I_=S$I_$I|6]$I|$JO=S$JO$JT6]$JT$JU=S$JU$KV6]$KV$KW=S$KW&FU6]&FU&FV=S&FV~6]~$^Y!r~X^$Xpq$X#y#z$X$f$g$X#BY#BZ$X$IS$I_$X$I|$JO$X$JT$JU$X$KV$KW$X&FU&FV$Xo%RP#eP!_!`%Un%ZO#hn~%`O#U~~%eQR~OY%`Z~%`~%nP#o#p%q~%vO#W~~%yPvw%|~&RO#m~~&UPwx&X~&^O%q~~&cO#]~~&hO#^~~&mO#r~~&rW#q~{|'[}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'y~'aW#t~{|'y}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'yk'|W{|'y}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'yk(iV{|)O}!O)O!O!P)O!Q![)O!c!})O#R#S)O#T#o)Ok)TW!Ok{|)O}!O)O!O!P)O!P!Q(f!Q![)O!c!})O#R#S)O#T#o)O~)rO!x~~)wX#f~{|'y}!O'y!O!P'y!P!Q(f!Q!['y!`!a*d!c!}'y#R#S'y#T#o'y~*iO#o~~*nW#Xk{|'y}!O'y!O!P+W!P!Q(f!Q![,b!c!}'y#R#S'y#T#o'yo+ZW{|'y}!O'y!O!P+s!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'yo+xW!yS{|'y}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'y~,g[%l~{|'y}!O'y!O!P'y!P!Q(f!Q![,b!c!g'y!g!h-]!h!}'y#R#S'y#T#X'y#X#Y-]#Y#o'y~-`W{|'y}!O'y!O!P'y!P!Q(f!Q![-x!c!}'y#R#S'y#T#o'y~-}W%l~{|'y}!O'y!O!P'y!P!Q(f!Q![-x!c!}'y#R#S'y#T#o'y~.lX#s~z{/X{|/|}!O/|!O!P/|!P!Q1T!Q![/|!c!}/|#R#S/|#T#o/|~/[ROz/Xz{/e{~/X~/hTOz/Xz{/e{!P/X!P!Q/w!Q~/X~/|OS~~0RW|~{|/|}!O/|!O!P/|!P!Q0k!Q![/|!c!}/|#R#S/|#T#o/|~0nV{|/|}!O/|!O!P/|!Q![/|!c!}/|#R#S/|#T#o/|~1YO#p~~1_W%k~{|'y}!O'y!O!P1w!P!Q(f!Q![1Y!c!}'y#R#S'y#T#o'y~1zW{|'y}!O'y!O!P'y!P!Q(f!Q![,b!c!}'y#R#S'y#T#o'y~2iO!t~~2nO!}~~2sW#i~{|3]}!O3]!O!P3]!Q![3]!_!`4j!c!}3]#R#S3]#T#o3]~3`X{|3]}!O3]!O!P3]!P!Q3{!Q![3]!`!a4e!c!}3]#R#S3]#T#o3]~4OV{|3]}!O3]!O!P3]!Q![3]!c!}3]#R#S3]#T#o3]~4jO{~~4oO#j~o4tP#YP!_!`4wn4|O#gn~5RP#k~!_!`5U~5ZO#l~~5`O!w~~5eO!{~~5jZV~wx6]{|6w}!O5e!O!P'y!P!Q(f!Q![5e![!]7g!c!}5e#R#S:]#T#o5e$g~6]~6bVV~wx6]}!O6]!Q![6]!c!}6]#R#S6]#T#o6]$g~6]~6zX{|6w}!O6w!O!P'y!P!Q(f!Q![6w![!]7g!c!}6w#R#S'y#T#o6w~7jdqr8xtu8xuv8xvw8xwx8xz{8x{|8x|}8x}!O8x!O!P8x!P!Q8x!Q![8x![!]8x!_!`8x!a!b8x!b!c8x!c!}8x#R#S8x#T#o8x#r#s8x~8}d!_~qr8xtu8xuv8xvw8xwx8xz{8x{|8x|}8x}!O8x!O!P8x!P!Q8x!Q![8x![!]8x!_!`8x!a!b8x!b!c8x!c!}8x#R#S8x#T#o8x#r#s8x~:bYV~wx6]{|'y}!O:]!O!P'y!P!Q(f!Q![:]!c!}:]#R#S:]#T#o:]$g~6]~;VO%t~~;[O%u~~;aO!u~~;dP#p#q;g~;lO#n~o;uO!ze%rW#VQ~;xP!P!Q;{~<OV{|<e}!O<e!O!P<e!Q![<e!c!}<e#R#S<e#T#o<e~<jW}~{|<e}!O<e!O!P<e!P!Q;{!Q![<e!c!}<e#R#S<e#T#o<e~=ZgV~!r~X^$Xpq$Xwx6]}!O6]!Q![6]!c!}6]#R#S6]#T#o6]#y#z$X$f$g$X$g#BY6]#BY#BZ=S#BZ$IS6]$IS$I_=S$I_$I|6]$I|$JO=S$JO$JT6]$JT$JU=S$JU$KV6]$KV$KW=S$KW&FU6]&FU&FV=S&FV~6]",
  tokenizers: [string, indentedString, 0, 1, 2, 3, 4],
  topRules: {"Nix":[0,5]},
  specialized: [{term: 7, get: value => spec_Identifier[value] || -1}],
  tokenPrec: 7441
});

const parser = parser$1;

const nixLanguage = language.LRLanguage.define({
  parser: parser.configure({
    props: [
      language.indentNodeProp.add({
        Parens: language.delimitedIndent({ closing: ")" }),
        AttrSet: language.delimitedIndent({ closing: "}" }),
        List: language.delimitedIndent({ closing: "]" }),
        Let: language.continuedIndent({ except: /^\s*in\b/ }),
      }),
      language.foldNodeProp.add({
        AttrSet: language.foldInside,
        List: language.foldInside,
        Let(node) {
          let first = node.getChild("let"),
            last = node.getChild("in");
          if (!first || !last) return null;
          return { from: first.to, to: last.from };
        },
      }),
      highlight.styleTags({
        Identifier: highlight.tags.propertyName,
        TRUE: highlight.tags.bool,
        FALSE: highlight.tags.bool,
        String: highlight.tags.string,
        StringContent: highlight.tags.string,
        IndentedString: highlight.tags.string,
        IndentedStringContent: highlight.tags.string,
        Comment: highlight.tags.lineComment,
        CommentBlock: highlight.tags.blockComment,
        Float: highlight.tags.float,
        Integer: highlight.tags.integer,
        NULL: highlight.tags.null,
        URI: highlight.tags.url,
        //SPath: t.literal, // TODO what is stringpath? not implemented in nix.grammar
        Path: highlight.tags.literal,
        "( )": highlight.tags.paren,
        "{ }": highlight.tags.brace,
        "[ ]": highlight.tags.squareBracket,
        "if then else": highlight.tags.controlKeyword,
        "import with let in rec builtins inherit assert or": highlight.tags.keyword,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "#", block: { open: "/*", close: "*/" } },
    closeBrackets: { brackets: ["(", "[", "{", "''", '"'] },
    indentOnInput: /^\s*(in|\}|\)|\])$/,
  },
});

function nix(options) {
  if (!options) options = {};
  if (!options.data) options.data = {};
  return new language.LanguageSupport(
    nixLanguage,
    nixLanguage.data.of(options.data),
  );
}

exports.nix = nix;
exports.nixLanguage = nixLanguage;
exports.parser = parser;
