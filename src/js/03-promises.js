const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button'),
}

console.log(refs.button);

refs.form.addEventListener('submit', onSubmit);

let position = 1;

function createPromise(position, delay) {
  
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay })
      } else {
        rej({ position, delay })
      }
    }, delay);
    })
    
  return promise
  
}

function onSubmit(event) {
  event.preventDefault();
  const { elements: { delay, step, amount } } = event.currentTarget;
  
  let promDelay = Number(delay.value);
  let promStep = Number(step.value);
  let promAmount = Number(amount.value);


  const promId = setInterval(() => {
    createPromise(position, promDelay)
    .then((result) => {
    console.log(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    })
    .catch((err) => {
    console.log(`❌ Rejected promise ${err.position} in ${err.delay}ms`);
    })
    .finally(() => {
      refs.form.reset()
      // console.log(promDelay)
      // console.log(promStep)
      // console.log(promAmount)
    })

    if (position === promAmount) {
        position = 1
        clearInterval(promId)
        return 
    } else {
        position += 1
        promDelay+= promStep
      }
       

  }, promDelay)

  
}