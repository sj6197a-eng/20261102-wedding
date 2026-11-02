// 사진을 누르면 다이얼로그(팝업)로 크게 보여줍니다.
const photoDialog = document.querySelector("#photoDialog");
const dialogImage = document.querySelector("#dialogImage");
document.querySelectorAll("[data-photo]").forEach((button) => {
  button.addEventListener("click", () => {
    dialogImage.src = button.dataset.photo;
    dialogImage.alt = button.querySelector("img")?.alt || "웨딩 사진";
    photoDialog.showModal();
  });
});

// 사진 팝업 바깥이나 닫기 버튼을 누르면 닫힙니다.
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
[photoDialog, document.querySelector("#noticeDialog")].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

// '사진 더 보기'는 갤러리의 아래쪽 사진으로 이동합니다.
document.querySelector("#morePhotos").addEventListener("click", () => {
  document.querySelector(".gallery-bottom").scrollIntoView({ behavior: "smooth", block: "center" });
});

// 계좌번호 복사 후 안내 팝업을 표시합니다. 복사 기능을 지원하지 않는 환경도 안내합니다.
const noticeDialog = document.querySelector("#noticeDialog");
const noticeTitle = document.querySelector("#noticeTitle");
const noticeMessage = document.querySelector("#noticeMessage");
document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const account = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(account);
      noticeTitle.textContent = "복사 완료";
      noticeMessage.textContent = `${button.dataset.owner} 계좌번호 ${account}를 복사했습니다.`;
    } catch (error) {
      noticeTitle.textContent = "계좌번호 안내";
      noticeMessage.textContent = `계좌번호: ${account} (이 번호를 길게 눌러 복사해 주세요.)`;
    }
    noticeDialog.showModal();
  });
});

// 이미지 로딩 오류를 감지해 개발 중 누락 파일을 확인할 수 있도록 콘솔에 기록합니다.
document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => console.error("이미지를 불러오지 못했습니다:", image.src));
});
