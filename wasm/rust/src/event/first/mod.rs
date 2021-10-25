use wasm_bindgen::JsCast;

pub struct IsRectArea {
  result: bool,
  index: i32,
}

pub struct Position {
  x: i32,
  y: i32,
  width: i32,
  height: i32,
}

struct RectPosition {
  x_start: i32,
  y_start: i32,
  x_end: i32,
  y_end: i32
}

pub fn is_area(x: i32, y: i32, position: Vec<Position>) -> IsRectArea {
  for index in 0..position.len() {
    let pos = &position[index];

    let rect_pos = RectPosition {
      x_start: pos.x,
      y_start: pos.y,
      x_end: pos.x + pos.width,
      y_end: pos.y + pos.height,
    };

    if x >= rect_pos.x_start && x <= rect_pos.x_end {
      if y >= rect_pos.y_start && y <= rect_pos.y_end {
        return IsRectArea {
          result: true,
          index: index as i32
        };
      }
    }
  }

  IsRectArea {
    result: false,
    index: -1,
  }
}

pub fn rect_area(canvas: web_sys::HtmlCanvasElement) {
  let cur = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();
  let mouse = | e: &web_sys::MouseEvent| {
    let x = e.client_x() - canvas.offset_left();
    let y = e.client_y() - canvas.offset_top();
  };
}