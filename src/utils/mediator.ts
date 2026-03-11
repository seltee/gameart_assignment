type EventTuple<Events> = {
  [K in keyof Events]: [K, Events[K]];
}[keyof Events];

export class Mediator<Events extends Record<string, any>> {
  subscribers: ((...event: EventTuple<Events>) => void)[] = [];

  subscribe(subscriber: (...event: EventTuple<Events>) => void) {
    this.unsubscribe(subscriber);
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: (...event: EventTuple<Events>) => void) {
    this.subscribers = this.subscribers.filter(
      (current) => current != subscriber,
    );
  }

  emit<K extends keyof Events>(event: K, data: Events[K]) {
    this.subscribers.forEach((subscriber) => {
      subscriber(event, data);
    });
  }
}
