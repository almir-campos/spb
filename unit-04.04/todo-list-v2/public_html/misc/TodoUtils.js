'use strict';
import {Config} from "../cfg.js";
import {Utils}  from "./utils.js";
import {Item}   from "../main/list/item/ItemDiv.js";

export class TodoUtils {
  static getItemElement(e) {
    return TodoUtils.eventContainsItem(e) ? e.target :
           e.target.closest('.item');
  };

  // TODO: Either use or Remove this method
  static getItemElementId(e) {
    return TodoUtils.getItemElement(e).id;
  }

  static eventContainsItem(e) {
    return Utils.isNotEmpty(e.target.classList) &&
           e.target.classList.contains('item');
  }

  // TODO: Either use or Remove this method
  static isSameItem(e, id) {
    const elem = TodoUtils.getItemElement(e);
    const item = new Item(elem);
    return item.get().id() === id;
  }

  // TODO: Either use or Remove this method
  static isNotSameItem(e, id) {
    const elem = TodoUtils.getItemElement(e);
    const item = new Item(elem);
    return item.get().id() !== id;
  }

  static eventDoesNotContainItem(e) {
    return !TodoUtils.eventContainsItem(e);
  }

  static eventContainsItemChild(e) {
    return Config.itemChildNames.includes(e.target.getAttribute('name'));
  }

  static eventDoesNotContainItemChild(e) {
    return !TodoUtils.eventContainsItemChild(e);
  }

  static eventContainsItemContext(e) {
    return TodoUtils.eventContainsItem(e) ||
           TodoUtils.eventContainsItemChild(e);
  }

  // TODO: Either use or Remove this method
  static eventDoesNotContainItemContext(e) {
    return TodoUtils.eventDoesNotContainItem(e) &&
           !TodoUtils.eventDoesNotContainItemChild(e);
  }

  static elementIsItem(elem) {
    return Utils.isNotEmpty(elem.classList) && elem.classList.contains('item');
  }

  static elementIsNotItem(elem) {
    return !TodoUtils.elementIsItem(elem);
  }

  static elementIsItemChild(elem) {
    return Config.itemChildNames.includes(elem.getAttribute('name'));
  }

  static elementIsNotItemChild(elem) {
    return !TodoUtils.elementIsItemChild(elem);
  }

  static elementIsNotInItemContext(elem) {
    return TodoUtils.elementIsNotItem(elem) &&
           TodoUtils.elementIsNotItemChild(elem);

  }
}
