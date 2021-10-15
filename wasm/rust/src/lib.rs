use wasm_bindgen::prelude::*;
// use wasm_bindgen::JsValue;

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