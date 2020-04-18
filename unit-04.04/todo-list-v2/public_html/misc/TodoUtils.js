'use strict';
import {Config} from "../cfg.js";
import {Utils}  from "./utils.js";

export class TodoUtils {
  static getItemElement(e) {
    return TodoUtils.eventContainsItem(e) ? e.target : e.target.closest('.item');
  };

  static getItemElementId( e ){
    return TodoUtils.getItemElement(e).id;
  }

  static eventContainsItem(e) {
    return Utils.isNotEmpty(e.target.classList) && e.target.classList.contains('item');
  }

  static eventDoesNotContainItem(e) {
    return !TodoUtils.eventContainsItem(e);
  }

  static eventContainsItemChild(e) {
    return Config.itemChildNames.includes(e.target.getAttribute('name'));
  }

  static eventDoesNotContainItemChild(e) {
    return !TodoUtils.eventContainsItemChild();
  }

  static eventContainItemContext(e) {
    return TodoUtils.eventContainsItem(e) ||
           TodoUtils.eventContainsItemChild(e);
  }

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
