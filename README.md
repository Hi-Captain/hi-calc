# hi-calc
make calculator with react

### 리액트로 계산기 만들기

> 2018.07.24
  * title : 초기 설정
  * content : create-react-app 생성, 초기 아이디어 구현
  * idea : 'eval can be harmful..!' eval을 대체할 다른방법은 없을까..?

> 2018.07.25 : del 버튼 추가
  * title : del 버튼 추가
  * content : 마지막 글자가 삭제되는 del 버튼 추가
  * idea : 계산가능한 범위 추가해볼까..?

> 2018.07.25
  * title : 계산 범위 추가
  * content : 입력값 범위, 계산값 범위 설정 
              + 계산값 표시 범위 설정 
              (음수값 혹은 소수점이 혼합된 숫자계산이 진행 될 경우 계산값의 길이가 너무 길어져서..)
  * idea : del 버튼 누르면 state.view 가 null 된다.. 버그 수정 필요!

> 2018.07.25
  * title : 버그 수정
  * content : - 소수점을 지우고나서 다시 소수점 버튼클릭시 소수점생성이 안됨.
                지우는 부분을 확인하고 decimal상태 초기화 진행.
              - clear버튼에 deciaml초기화 누락 수정.
  * idea : 어느정도 정리가 된 것 같으니 스타일 정리를 할까..?

> 2018.07.26
  * title : CSS정리 및 버그 수정
  * content : - CSS 정리
              - NaN값 0 으로 처리
  * idea : - 디자인은 어렵다..
           - 레이아웃도 어렵다..
           - 키보드 버튼도 적용해 볼 수 있을까..?