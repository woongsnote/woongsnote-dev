---
title: TMCB - The Movie Card Book
description: 영화 후기 앱
author: 문지웅
authorImage: https://avatars.githubusercontent.com/u/83802168?v=4
coverImage: https://user-images.githubusercontent.com/83802168/155482950-2db50f75-a593-4031-aaa1-9e298d5cbecd.png
date: "2022-01-04"
---

## 개요

- 내가 본 영화들의 리뷰를 작성하고 관리하는 Android Application 입니다.

### **목표**

- **최신 영화 정보 제공**
- **광고 없는 공간 제공**

## 프로젝트 내용

### **문제 인식**

✨ **“늘어나는 OTT 서비스, 모든 리뷰를 관리할 수 있는 공간의 부재”**

### 프로젝트 기획

🏆 **Movie Card Book** 이라고 이름을 정한 이유

1. **Movie**: 영화에 대한 리뷰 App.
2. **Card Book**: 영화관에서 구매할 수 있는 **Photo 카드** 에서 디자인 참고.

✨ **TMCB와 비슷한 서비스**

- **[Moodi](https://play.google.com/store/apps/details?id=com.memolease.android.simplelog)**
- Moodi 와 차이점
  - **광고 X**
  - 리뷰 기능 Only
  - 영화에 대한 리뷰만 가능

🗓️ **개발 기간**: 5주

🎬 **영화 정보**: TMDB API 활용

🧰 **라이브러리**

- 🖼️ **이미지** - Glide, jsoup
- 🖥️ **통신** - okhttp, retrofit, json
- 🔒 **데이터베이스** - Firebase Firestore
- 👨🏻‍💻 **사용자 관리** - Firebase Auth

🧰 **Flow 차트**

![flow chart](https://user-images.githubusercontent.com/83802168/155483046-e87e2ef6-1523-462c-b631-5d15271c04c5.png)

### 설계

[화면_설계서.pdf](https://github.com/woongsnote/tmcb/files/8130702/_.pdf)

### 구현

1. **개발 스택**

1. **개발 환경**

    | 종류 | 이름 |
    | --- | --- |
    | OS | Window10 & Window 11 |
    | 프레임워크 | Android Native |
    | 에디터 | Android Studio Fox |
    | 빌더 | Android Studio Fox |
    | 테마 | Material Design 3 |
    | 테스트 기기 | Galaxy Note 10 plus |
    | 스토어 등록 여부 | 등록 완료 |

### 테스트

1. *Android Virtual Device*
2. *Galaxy Note 10+*

### 출시

[TMCB - Apps on Google Play](https://play.google.com/store/apps/details?id=com.woongsnote.mcb)

## ⭐ **프로젝트 결과** ⭐

### 핵심 코드

```kotlin
//**영화 정보 가져오는 부분**
private fun getSearchMovies() {

        binding.pbLoading.visibility = View.VISIBLE

        MoviesRepository.getSearchMovies(
            searchKeyWord,
            ::onSearchMoviesFetched,
            ::onError
        )
    }

    private fun onSearchMoviesFetched(movies: List<Movie>) {
        binding.pbLoading.visibility = View.GONE
        searchMoviesAdapter.updateMovies(movies)
    }

    private fun onError() {
        Toast.makeText(this, "search Error", Toast.LENGTH_SHORT).show()
    }
```

### **실행 결과**

![실행 결과](https://user-images.githubusercontent.com/83802168/155482950-2db50f75-a593-4031-aaa1-9e298d5cbecd.png)
