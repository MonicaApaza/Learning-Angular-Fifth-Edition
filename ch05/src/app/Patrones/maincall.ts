import { Subscriber, YoutubeChannel } from "./observable";

var yt = new YoutubeChannel();
var s1 = new Subscriber(yt);
var s2 = new Subscriber(yt);
yt.attach(s1);
yt.attach(s2);
yt.addNewVideo('Observer Pattern in TypeScript');
yt.addNewVideo('Observer Pattern in JavaScript');
