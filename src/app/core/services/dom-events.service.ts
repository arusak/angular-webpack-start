import {Injectable, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";

/**
 * @see https://www.bennadel.com/blog/3147-creating-an-event-driven-pre-bootstrap-loading-screen-in-angular-2-0-0.htm
 */

@Injectable()
export class DomEventsService {
  private doc: Document;

  constructor(@Inject(DOCUMENT) doc: any) {
    this.doc = doc;
  }

  // Trigger the given event on the document root
  public triggerOnDocument(eventType: string): Event {
    return ( this.triggerOnElement(this.doc, eventType) );
  }


  // Trigger the given event configuration on the given element
  public triggerOnElement(nativeElement: any,
                          eventType: string,
                          bubbles: boolean = true,
                          cancelable: boolean = false): Event {
    let customEvent = this.createEvent(eventType, bubbles, cancelable);
    nativeElement.dispatchEvent(customEvent);
    return ( customEvent );
  }

  // Create and return a custom event with the given configuration.
  private createEvent(eventType: string,
                      bubbles: boolean,
                      cancelable: boolean): Event {
    let customEvent: any;

    // Trying the "normal" event generation and then fallback to using the IE version.
    try {
      customEvent = new CustomEvent(eventType, {
        bubbles: bubbles,
        cancelable: cancelable
      });
    } catch (error) {
      customEvent = this.doc.createEvent("CustomEvent");
      customEvent.initCustomEvent(eventType, bubbles, cancelable);
    }

    return ( customEvent );
  }
}
