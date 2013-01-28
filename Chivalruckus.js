var jship = jship || {};

jship.KeySpammer = function(msgTitle)
{
    this.wshShell        = WScript.CreateObject("WScript.Shell");
    this.chivWindowTitle = "Chivalry: Medieval Warfare (32-bit, DX9)";
    this.msgTitle        = msgTitle;
};

jship.KeySpammer.Messages = {
    yes            : ["x", "1"],
    no             : ["x", "2"],
    help           : ["x", "3"],
    gotYourBack    : ["x", "4"],
    thanks         : ["x", "5"],
    youAreWelcome  : ["x", "6"],
    sorry          : ["x", "7"],
    taunt          : ["x", "8"],
    laugh          : ["x", "9"],
    respect        : ["x", "0"],

    followMe       : ["z", "1"],
    forward        : ["z", "2"],
    retreat        : ["z", "3"],
    killArchers    : ["z", "4"],
    goForObjective : ["z", "5"],
    holdYourGround : ["z", "6"],
    defendMe       : ["z", "7"],
    incoming       : ["z", "8"],
    behindUs       : ["z", "9"],
    allClear       : ["z", "0"],
    
    battleCry      : ["c"]
};

jship.KeySpammer.prototype.sendMessage = function()
{
    var voiceMenuKey    = jship.KeySpammer.Messages[this.msgTitle][0];
    var voiceMessageKey = jship.KeySpammer.Messages[this.msgTitle][1];

    this.wshShell.AppActivate(this.chivWindowTitle);
    WScript.Sleep(100);

    this.wshShell.SendKeys(voiceMenuKey);

    if (voiceMessageKey)
    {
        WScript.Sleep(300);
        this.wshShell.SendKeys(voiceMessageKey);
    }
};

jship.KeySpammer.prototype.run = function()
{
    while (true)
    {
        WScript.Sleep(500);
        this.sendMessage();
    }
};

(function()
 {
     function getMessageParameter(namedArgs)
     {
         var msgTitle, field;

         if (!namedArgs.Exists("message"))
         {
             WScript.Echo("ERROR: Must pass in a message!");
             WScript.Quit();
         }

         msgTitle = namedArgs.Item("message");
         
         if (!jship.KeySpammer.Messages[msgTitle])
         {
             WScript.Echo("ERROR: Invalid message! Here are your choices:");
             for (field in jship.KeySpammer.Messages)
             {
                 if (jship.KeySpammer.Messages.hasOwnProperty(field))
                 {
                     WScript.Echo("\t" + field);
                 }
             }

             WScript.Quit();
         }
         
         if (msgTitle == "battleCry")
         {
             WScript.Echo("WARNING:");
             WScript.Echo("Spamming battle cry makes playing impossible!");
             WScript.Echo("\n");
         }
     
         return msgTitle;
     };

     var namedArgs = WScript.Arguments.Named;
     var msgTitle  = getMessageParameter(namedArgs);

     WScript.Echo("Now spamming the " + msgTitle + " message. Have fun!");

     var keySpammer = new jship.KeySpammer(msgTitle);
     keySpammer.run();
 })();
