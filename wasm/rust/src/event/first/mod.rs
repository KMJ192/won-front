use serde::{Serialize, Deserialize};

pub struct IsRectArea {
  result: bool,
  index: i32,
}

#[derive(Clone, Copy, Serialize, Deserialize)]
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

pub fn is_area(x: i32, y: i32, position: &Vec<Position>) -> IsRectArea {
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

pub fn rect_area(e: &web_sys::MouseEvent, canvas: &web_sys::HtmlCanvasElement, ctx: &web_sys::CanvasRenderingContext2d, position: Vec<Position>) {
  let mouse = | e: &web_sys::MouseEvent| {
    let x: i32 = e.client_x() - canvas.offset_left();
    let y: i32 = e.client_y() - canvas.offset_top();
    let ini: IsRectArea = is_area(x, y, &position);
    if ini.result == true {
      ctx.clear_rect(0.0, 0.0, 600.0, 400.0);
      for idx in 0..position.len() {
        let pos = position[idx];
        ctx.save();
        if ini.index == idx as i32 {
          ctx.set_fill_style(&"blue".into());
        }
        ctx.fill_rect(
          pos.x as f64, 
          pos.y as f64, 
          pos.width as f64, 
          pos.height as f64
        );
        ctx.restore();
      }
    }
  };
  mouse(e);
}