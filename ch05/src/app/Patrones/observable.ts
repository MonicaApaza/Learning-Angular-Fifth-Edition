interface Observable {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

interface Observer {
  update(): void;
}

export class YoutubeChannel implements Observable {
  private channelSubscribers: Observer[] = [];
  private lastVideoTitle: string = '';

  attach(observer: Observer): void {
    this.channelSubscribers.push(observer);
  }
  detach(observer: Observer): void {
    this.channelSubscribers = this.channelSubscribers.filter(
      (subscriber) => subscriber !== observer,
    );
  }

  notify(): void {
    this.channelSubscribers.forEach((subscriber) => subscriber.update());
  }

  addNewVideo(title: string) {
    //console.log(`New video added to the channel: ${title}`);
    this.lastVideoTitle = title;
    this.notify();
  }

  lastVideo(): string {
    return this.lastVideoTitle;
  }

}

export class Subscriber implements Observer {
  private observable: Observable = undefined as any;
  constructor(observable: Observable) {
    this.observable = observable;
  }
  update(): void {
    // console.log(`New video uploaded! Check it out!`);
    console.log(`The title of the new video is: ${(this.observable as YoutubeChannel).lastVideo()}`);
  }
}
