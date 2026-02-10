import gsap from 'gsap';
import '../style.css';

const gridWidth = 20;

const [row, col] = [(document.body.offsetHeight / gridWidth) | 0, (document.body.offsetHeight / gridWidth) | 0];

console.log(row);

const first = Array.from({ length: row - 18 }, (_, index) => 9 + index + 2 * col);

const second = Array.from({ length: row - 10 }, (_, index) => 5 + index + 5 * col);

const third = Array.from({ length: 9 }, (_, index) => second[0] + (index + 1) * col);
const fourth = Array.from({ length: 9 }, (_, index) => second[second.length - 1] + (index + 1) * col);

const fiveth = Array.from({ length: 11 }, (_, index) => {
  const ele = first[(first.length / 2) | 0] + (index + 1) * col;

  if (second.includes(ele)) {
    return 0;
  } else {
    return ele;
  }
}).filter(Boolean);

const sixth = Array.from(
  { length: Math.ceil(second.length / 2) - 6 },
  (_, index) => (second[0] % col) + 3 + index + 8 * col,
);

const seventh = Array.from(
  { length: Math.ceil(second.length / 2) - 6 },
  (_, index) => (second[0] % col) + 3 + index + 11 * col,
);

const eighth = Array.from(
  { length: Math.ceil(second.length / 2) - 6 },
  (_, index) => (second[second.length - 1] % col) - 3 - index + 8 * col,
);

const nineth = Array.from(
  { length: Math.ceil(second.length / 2) - 6 },
  (_, index) => (second[second.length - 1] % col) - 3 - index + 11 * col,
);

const tenth = Array.from({ length: row - 20 }, (_, index) => 10 + index + 18 * col);
const eleventh = Array.from({ length: row - 27 }, (_, index) => 10 + (index + 19) * col);
const twelfth = Array.from({ length: row - 27 }, (_, index) => 9 + tenth.length + (index + 19) * col);
const thirteenth = Array.from({ length: row - 20 }, (_, index) => 10 + index + (20 + eleventh.length - 1) * col);

const fourteenth = Array.from(
  { length: row - 27 },
  (_, index) => (tenth[(tenth.length / 2) | 0] % col) + (index + 19) * col,
);

const fivteenth = Array.from({ length: row - 22 }, (_, index) => {
  const ele = 11 + index + ((19 + (eleventh.length / 2 - 1)) | 0) * col;
  if (fourteenth.includes(ele)) {
    return 0;
  } else {
    return ele;
  }
}).filter(Boolean);

console.log(tenth);
console.log(eleventh);
console.log(twelfth);

const total = [
  ...first,
  ...second,
  ...third,
  ...fourth,
  ...fiveth,
  ...sixth,
  ...seventh,
  ...eighth,
  ...nineth,
  ...tenth,
  ...eleventh,
  ...twelfth,
  ...thirteenth,
  ...fourteenth,
  ...fivteenth,
];

const container = document.querySelector('.container');
container.style.display = 'grid';
container.style.margin = '0 auto';
container.style.background = '#ccc';
container.style.width = row * gridWidth + 'px';
container.style.height = col * gridWidth + 'px';
container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
container.style.gridTemplateRows = `repeat(${row}, 1fr)`;

const fragment = document.createDocumentFragment();
const targets = [];
const targets1 = [];
const targets2 = [];
const targets3 = [];
const targets4 = [];
const targets5 = [];
const targets6 = [];
const targets7 = [];
const targets8 = [];
const targets9 = [];
const targets10 = [];
const targets11 = [];
const targets12 = [];
const targets13 = [];
const targets14 = [];

for (let i = 0; i < row * col; i++) {
  const div = document.createElement('div');
  if (total.includes(i)) {
    div.classList.add('gridBox');
  }

  if (first.includes(i)) {
    targets.push(div);
  }

  if (second.includes(i)) {
    targets1.push(div);
  }

  if (third.includes(i)) {
    targets2.push(div);
  }

  if (fourth.includes(i)) {
    targets3.push(div);
  }

  if (fiveth.includes(i)) {
    targets4.push(div);
  }

  if (sixth.includes(i)) {
    targets5.push(div);
  }

  if (eighth.includes(i)) {
    targets6.push(div);
  }

  if (seventh.includes(i)) {
    targets7.push(div);
  }

  if (nineth.includes(i)) {
    targets8.push(div);
  }

  if (tenth.includes(i)) {
    targets9.push(div);
  }

  if (thirteenth.includes(i)) {
    targets10.push(div);
  }

  if (eleventh.includes(i)) {
    targets11.push(div);
  }

  if (twelfth.includes(i)) {
    targets12.push(div);
  }

  if (fourteenth.includes(i)) {
    targets13.push(div);
  }

  if (fivteenth.includes(i)) {
    targets14.push(div);
  }

  gsap.set(targets14, { yPercent: 50 });
  fragment.appendChild(div);
}

container.appendChild(fragment);

const tl = gsap.timeline({repeat: true});

tl.from(targets, {
  yPercent: -200,
  opacity: 0,
  duration: 0.6,
  stagger: 0.08,
  ease: 'sine.inOut',
})
  .from(targets1, {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    stagger: 0.005,
  })
  .from(targets2, {
    xPercent: -100,
    duration: 1.5,
    opacity: 0,
    stagger: 0.01,
    ease: 'elastic.inOut',
  })
  .from(
    targets3,
    {
      xPercent: 100,
      duration: 1.5,
      opacity: 0,
      stagger: 0.01,
      ease: 'elastic.inOut',
    },
    '<',
  )
  .from(targets4, {
    xPercent: (index) => (index % 2 ? 60 : -60),
    duration: 0.5,
    opacity: 0,
    stagger: 0.005,
    ease: 'sine.out',
  })
  .from(targets5, {
    xPercent: -100,
    duration: 1.5,
    opacity: 0,
    stagger: 0.02,
    ease: 'elastic.inOut',
  })
  .from(
    targets6,
    {
      xPercent: 100,
      duration: 1.5,
      opacity: 0,
      stagger: {
        each: 0.02,
        from: 'end',
      },
      ease: 'elastic.inOut',
    },
    '<',
  )
  .from(
    targets7,
    {
      xPercent: -100,
      duration: 1.5,
      opacity: 0,
      stagger: 0.02,
      ease: 'elastic.inOut',
    },
    '-=0.8',
  )
  .from(
    targets8,
    {
      xPercent: 100,
      duration: 1.5,
      opacity: 0,
      stagger: {
        each: 0.02,
        from: 'end',
      },
      ease: 'elastic.inOut',
    },
    '<',
  )
  .from(targets9, {
    xPercent: -300,
    duration: 2,
    opacity: 0,
    stagger: {
      each: 0.02,
      from: 'start',
    },
    ease: 'elastic.inOut',
  }, '-=40%')
  .from(
    targets10,
    {
      xPercent: 300,
      duration: 2,
      opacity: 0,
      stagger: {
        each: 0.02,
        from: 'end',
      },
      ease: 'elastic.inOut',
    },
    '<',
  )
  .from(
    targets11,
    {
      //  xPercent: -300,
      yPercent: (index) => -(index + 0) * 100,
      duration: 2,
      opacity: 0,
      stagger: {
        from: 'start',
        each: 0.02,
      },
      ease: 'elastic.inOut',
    },
    '-=2',
  )
  .from(
    targets12,
    {
      //  xPercent: -300,
      yPercent: (index) => (targets11.length - index - 1) * 100,
      duration: 2,
      opacity: 0,
      stagger: {
        from: 'end',
        each: 0.02,
      },
      ease: 'elastic.inOut',
    },
    '<',
  )
  .from(targets13, {
    xPercent: (index) =>
      index <= 5
        ? -Math.sin(gsap.utils.interpolate(Math.PI / 2, Math.PI / 12, index / 6)) * 300
        : Math.sin(gsap.utils.interpolate(Math.PI / 12, Math.PI / 2, (index - 5) / 6)) * 300,
    opacity: 0,
    duration: 0.5,
    stagger: {
      from: 'center',
      each: 0.01,
    },
    ease: 'sine.inOut',
  })
  .from(targets14, {
    yPercent: (index) => {

      if (index <= 7) return (Math.sin(gsap.utils.interpolate([0, Math.sin(Math.PI / 2)], index / 7)) + 1) * 300 + 50;

      if (index > 7)
        return (Math.sin(gsap.utils.interpolate([Math.sin(Math.PI / 2), 0], (index - 7) / 7)) + 1) * 300 + 50;
    },
    opacity: 0,
    duration: 0.6,
  });
