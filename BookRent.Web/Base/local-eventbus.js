/*
 *   Copyright (c) 2011-2015 The original author or authors
 *   ------------------------------------------------------
 *   All rights reserved. This program and the accompanying materials
 *   are made available under the terms of the Eclipse Public License v1.0
 *   and Apache License v2.0 which accompanies this distribution.
 *
 *       The Eclipse Public License is available at
 *       http://www.eclipse.org/legal/epl-v10.html
 *
 *       The Apache License v2.0 is available at
 *       http://www.opensource.org/licenses/apache2.0.php
 *
 *   You may elect to redistribute this code under either of these licenses.
 */
!function (factory) {
    LocalEventBus = factory();
}(function () {


  var LocalEventBus = function (name, processors) {
    var self = this;


    // attributes
    this.name = name;
    this.state = LocalEventBus.CONNECTING;
    this.handlers = {};
    this.processors = processors || {};
    this.defaultHeaders = null;

    // default event handlers
    this.onerror = console.error;
    this.onopen = null;

    self.state = LocalEventBus.OPEN;
    this.open = function(){
      self.onopen();
    };

  };


  LocalEventBus.prototype.send = function (address, message, headers, callback) {
    // are we ready?
    if (this.state != LocalEventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    if (typeof headers === 'function') {
      callback = headers;
      headers = {};
    }

    var processor = this.handlers[address];
    if(processor != null && processor.length > 0){
        var result = processor[0](message, headers);
        if(result != null){
          callback(null, result);
        }else{
          callback("null result", result);
        }
    }

  };


  LocalEventBus.prototype.publish = function (address, message, headers) {
    // are we ready?
    if (this.state != LocalEventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    var callbacks = this.handlers[address];
    if(callbacks != null){
        for(var i = 0; i < callbacks.length; i++){
          callbacks[i](null, message);
        }
    }

  };


  LocalEventBus.prototype.registerHandler = function (address, headers, callback) {
    // are we ready?
    if (this.state != LocalEventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    if (typeof headers === 'function') {
      callback = headers;
      headers = {};
    }

    // ensure it is an array
    if (!this.handlers[address]) {
      this.handlers[address] = [];
    }

    this.handlers[address].push(callback);
  };


  LocalEventBus.prototype.unregisterHandler = function (address, headers, callback) {
    // are we ready?
    if (this.state != LocalEventBus.OPEN) {
      throw new Error('INVALID_STATE_ERR');
    }

    var handlers = this.handlers[address];

    if (handlers) {

      if (typeof headers === 'function') {
        callback = headers;
      }

      var idx = handlers.indexOf(callback);
      if (idx != -1) {
        handlers.splice(idx, 1);
        if (handlers.length === 0) {
          delete this.handlers[address];
        }
      }
    }
  };


  LocalEventBus.prototype.close = function () {
    this.state = LocalEventBus.CLOSING;
  };

  LocalEventBus.prototype.reconnect = function () {
        this.state = LocalEventBus.OPEN;
  };

  LocalEventBus.CONNECTING = 0;
  LocalEventBus.OPEN = 1;
  LocalEventBus.CLOSING = 2;
  LocalEventBus.CLOSED = 3;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = LocalEventBus;
    } else {
      exports.LocalEventBus = LocalEventBus;
    }
  } else {
    return LocalEventBus;
  }
});