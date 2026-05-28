---
title: 'React.Fragment에 관하여'
description: 'React.Fragment에 대한 정리'
publishedDate: 2023-08-07
category: 'Tech'
author: 'woongsnote'
tags: ['React', 'Fragment']
slug: 'react-fragment'
---

## React.Fragment란?

React.Fragment는 React 컴포넌트를 반환할 때 여러 개의 자식 요소를 묶어주는 역할을 하는 특수한 컴포넌트다.
React.Fragment를 사용하면 불필요한 div 태그나 span 태그 등을 추가하지 않고도 여러 개의 자식 요소를 렌더링할 수 있다.
이를 통해 불필요한 추가 DOM 레이어를 만들지 않아 메모리 사용량과 렌더링 성능을 개선할 수 있다.

## React.Fragment를 사용하는 방법

- `<React.Fragment>` ... `</React.Fragment>` 형태로 JSX 문법을 사용하는 경우
- <></> 형태로 축약된 문법을 사용하는 경우
- React.Fragment 컴포넌트를 직접 호출하는 경우

예를 들어, 다음과 같은 **컴포넌트**가 있다고 가정해보자.

```tsx
const MyComponent = () => {
  return (
    <div>
      <h1>Hello</h1>
      <p>This is a example Component.</p>
    </div>
  );
};
```

이 컴포넌트는 `div` 태그로 감싸져 있기 때문에 하나의 자식 요소만 반환하고 있다.
하지만 `div` 태그가 불필요하거나 원치 않는 스타일이나 속성을 가지고 있다면, `React.Fragment`를 사용하여 대체할 수 있다.
예를 들어, 다음과 같이 작성할 수 있다.

```tsx
const MyComponent = () => {
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <p>This is a React Fragment example.</p>
    </React.Fragment>
  );
};
```

또는 축약된 문법을 사용해서 다음과 같이 작성할 수도 있다.

```tsx
const MyComponent = () => {
  return (
    <>
      <h1>Hello</h1>
      <p>This is a React Fragment example.</p>
    </>
  );
};
```

이렇게 하면 div 태그 없이도 여러 개의 자식 요소를 렌더링할 수 있다.
React.Fragment는 key 속성을 제외하고는 어떠한 속성도 받지 않는다.
key 속성은 **map** 메서드 등을 사용하여 여러 개의 `React.Fragment`를 생성할 때 필요하다.

예를 들어, 다음과 같이 작성할 수 있다.

```tsx
function App() {
  const items = ['Apple', 'Banana', 'Cherry'];
  return (
    <ul>
      {items.map((item) => (
        <React.Fragment key={item}>
          <li>{item}</li>
          <li>{item.length}</li>
        </React.Fragment>
      ))}
    </ul>
  );
}
```

이렇게 하면 각각의 React.Fragment에 고유한 key 값을 부여하여 배열의 요소를 렌더링할 수 있다.
축약된 문법은 key 속성을 지원하지 않으므로 이런 경우에는 사용할 수 없다!

## 결론

React.Fragment는 여러 개의 자식 요소를 묶어주는 간단하지만 유용한 기능으로, 불필요한 DOM 요소를 줄여주고 성능과 가독성을 향상시켜준다.
React 개발자라면 반드시 알아두고 활용해야 할 기능이다!
