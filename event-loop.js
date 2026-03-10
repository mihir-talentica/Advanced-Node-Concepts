//node myFile.js
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running (node detects automatically)
//myFile.runContents()

function shouldContinue() {
    //Check one: any pending setTimeout, setInterval, setImmediate?
    //Check two: any pending OS tasks? (like server listening to port)
    //Check three: any pending long running operations? (like fs module)
  return (
    pendingTimers.length ||
    pendingOSTasks.length ||
    pendingOperations.length
  );
}

//Entire body executes in one 'tick'
while (shouldContinue()) {
  //1) Node looks at pendingTimers and sees if any functions are ready to be called. setTimeout, setInterval

  //2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

  //3) Pause execution. Continue when...
  // - a new pendingOSTasks is done
  // - a new pendingOperation is done
  // - a timer is about to complete

  //4) Look at pendingTimers. Call any setImmediate

  //5) Handle any 'close' events
}

//exit back to terminal
