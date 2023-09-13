var showButton = document.getElementById("showButton");
var uploadButton = document.getElementById("uploadButton");

showButton.onclick = function () {
    let selectFile = document.getElementById("fileInput").files[0];
    const file = URL.createObjectURL(selectFile);
    document.getElementById("uploadedImage").src = file;
}

uploadButton.onclick = function () {
    var sendIntervalButton = document.getElementById("sendInterval");
    var sendTimesButton = document.getElementById("sendTimes");
    var sendInterval = sendIntervalButton.value;
    var sendTimes = sendTimesButton.value;

    if (!isNaN(sendInterval)) { // 입력된 값이 숫자인지 확인
        sendInterval = parseInt(sendInterval); // 문자열을 숫자로 변환
        console.log('sendInterval:', sendInterval);

        // 이제 "result" 변수에 입력된 숫자가 저장되었습니다.
        // 여기에서 필요한 작업을 수행할 수 있습니다.
    } else {
        alert('올바른 숫자를 입력하세요.');
    }

    if (!isNaN(sendTimes)) { // 입력된 값이 숫자인지 확인
        sendTimes = parseInt(sendTimes); // 문자열을 숫자로 변환
        console.log('sendTimes:', sendTimes);

        // 이제 "result" 변수에 입력된 숫자가 저장되었습니다.
        // 여기에서 필요한 작업을 수행할 수 있습니다.
    } else {
        alert('올바른 숫자를 입력하세요.');
    }

    const reader = new FileReader();
    var blob = document.getElementById("uploadedImage").src;
    // 이미지 태그의 src 속성에서 Blob URL 가져오기
    var blobUrl = document.getElementById('uploadedImage').src;

    // Blob URL을 Blob로 변환
    fetch(blobUrl)
    .then(response => response.blob())
    .then(blob => {
        var reader = new FileReader();
        
        reader.onload = function() {
            var base64String = reader.result; // "data:image/jpeg;base64," 부분을 제거
            var count = 0;
            var serverURL = "127.0.0.1:80/api/detectionr"
            var intervalId = setInterval(function () {
                postRequest(serverURL, base64String);
                count++;

                if (count >= sendTimes) {
                    clearInterval(intervalId);
                }
            }, sendInterval);
        };
        
        reader.readAsDataURL(blob);
    })
    .catch(error => {
        console.error('Blob URL을 가져오는 동안 오류 발생:', error);
    });

}

function postRequest(serverURL, base64String) {
    fetch(serverURL, {
        method: "POST",
        body: JSON.stringify({
            frame_id: 0,
            event_id: "0",
            image: base64String
        })
    })
    .then(function (data) {
        console.log(data);
    })
    .then(function (error) {
        console.log("Error");
    });
}