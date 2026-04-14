/**
 * Plain data model for a diagram node (not a React component).
 */
export class DiagramModel {
  constructor(header, body) {
    this.Id = 0;
    this.top = 0;
    this.bottom = 0;
    this.left = 100;
    this.right = 0;
    this.width = 172;
    this.height = 100;
    this.header = header;
    this.body = body;
  }

  setPosition(top, left) {
    this.top = top;
    this.left = left;
  }

  getPosition() {
    return { left: this.left, top: this.top };
  }

  setId(id) {
    this.Id = id;
  }
}
