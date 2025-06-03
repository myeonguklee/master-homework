// 1. 의도적인 데드락 코드와 해결된 코드 구현

function createDeadlock(){
  let promiseA: Promise<string>, promiseB: Promise<string>;

  promiseA = new Promise<string>((resolve) => {
    promiseB.then(() => {
      resolve('A');
    });
  });

  promiseB = new Promise<string>((resolve) => {
    promiseA.then(() => {
      resolve('B');
    });
  });

  Promise.all([promiseA, promiseB])
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
}

function createConditionalPromises(): Promise<[string, string]>{
  let conditionMet = false;

  const promiseA = new Promise<string>((resolve) =>{
    setTimeout(() => {
      conditionMet = true;
      resolve("A");
    }, 1_000);
  });

  const promiseB = new Promise<string>((resolve) =>{
    const checkCondition = () => {
      if(conditionMet){
        resolve("B");
      }else{
        setTimeout(checkCondition, 100);
      }
    };
    checkCondition();
  })

  return Promise.all([promiseA, promiseB]);
}

// 2. 의도적인 메모리 누수 코드와 해결된 코드 구현

class LeakyTimer {
  private heavyObject= new Array(1_000_000).fill('Heavy data');
  private timerId: number | null = null;

  start(){
    this.timerId = setInterval(()=>{
      console.log('타이머 실행 중...')
    }, 1_000);
  }
  stop(){
    if(this.timerId){
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

class safeTimer {
  private heavyObject= new Array(1_000_000).fill('Heavy data');
  private controller: AbortController | null = null;

  start(){
    this.controller = new AbortController();
    const { signal } = this.controller;

    const run = () => {
      if(signal.aborted) return;
      console.log('타이머 실행 중...');
      setTimeout(run, 1_000);
    };

    run();
  }

  stop(){
    if(this.controller){
      this.controller.abort();
      this.controller = null;
    }
    this.heavyObject = null as any;
  }
}