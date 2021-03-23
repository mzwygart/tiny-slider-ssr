// get subpixel support value
// @return - boolean
import { getBody } from './getBody.js';
import { setFakeBody } from './setFakeBody.js';
import { resetFakeBody } from './resetFakeBody.js';
import { isServer } from './isServer.js';

export function percentageLayout() {
  // In SSR if it is server side retun false
  if(isServer)
    return false;

  // check subpixel layout supporting
  var doc = document,
      body = getBody(),
      docOverflow = setFakeBody(body),
      wrapper = doc.createElement('div'),
      outer = doc.createElement('div'),
      str = '',
      count = 70,
      perPage = 3,
      supported = false;

  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";

  for (var i = 0; i < count; i++) {
    str += '<div></div>';
  }

  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);

  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;

  body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();

  return supported;
}