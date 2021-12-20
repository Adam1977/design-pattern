// 观察者模式 or 发布订阅模式
let EventCenter = (function () {
  let events = {};
  function on(event, handler) {
    events[event] = events[event] || [];
    events[event].push({
      handler: handler,
    });
  }
  function fire(event, ...args) {
    if (!events[event]) return;
    for (let i = 0; i < events[event].length; i++) {
      events[event][i].handler(...args);
    }
  }
  function off(event) {
    delete events[event];
  }
  return {
    on: on,
    fire: fire,
    off: off,
  };
})();

EventCenter.on("listen", (data) => {
  console.log("listen is ready---", data);
});
EventCenter.on("listen", (data, other) => {
  console.log("listen is ready2---", data, other);
});

EventCenter.fire("listen", { ll: 123, b: 333 }, "other");

/**
 * Output
 * listen is ready--- { ll: 123, b: 333 }
 * listen is ready2--- { ll: 123, b: 333 } other
 */
