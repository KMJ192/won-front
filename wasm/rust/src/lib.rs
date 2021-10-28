use wasm_bindgen::prelude::*;
// use js_sys::Array;
// use wasm_bindgen::JsCast;
use wasm_bindgen::JsValue;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

#[wasm_bindgen]
pub fn console_test(str: String) {
    web_sys::console::log_1(&str.into());
}

pub mod event;
use event::first::*;

#[wasm_bindgen]
pub fn first_evnet(e: &web_sys::MouseEvent, canvas: &web_sys::HtmlCanvasElement, ctx: &web_sys::CanvasRenderingContext2d, position: &JsValue) {
    let pos: Vec<Position> = position.into_serde().unwrap();
    rect_area(e, canvas, ctx, pos);
}