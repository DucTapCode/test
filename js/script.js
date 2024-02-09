// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKIu_LjdrR1I30uU-e_m3MGTW-QByCmtc",
  authDomain: "dtfapp15122009.firebaseapp.com",
  databaseURL: "https://dtfapp15122009-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dtfapp15122009",
  storageBucket: "dtfapp15122009.appspot.com",
  messagingSenderId: "854582442778",
  appId: "1:854582442778:web:1b4b544ab0403004c68aa3",
  measurementId: "G-04TJ3EWMMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const ten = prompt(`Nhập tên của bạn:`);

// Chọn nút

const btn = document.getElementById('up');

// Thêm lắng nghe sự kiện click cho nút đã chọn

btn.addEventListener('click', e => {

  const filename = prompt("Tên file ảnh của bạn là gì?");

  // Lấy tệp từ trường nhập tệp

  const file = document.querySelector('input').files[0];

  // Tạo tham chiếu đến Firebase Storage

  const storageRef = firebase.storage().ref();

  // Tạo tham chiếu con. Chúng ta tạo một thư mục có tên "images" và thêm tệp mà người dùng đã chọn vào Firebase

  const final = storageRef.child(`images/${ten}/${filename}`);

  // Tải lên tệp. Chúng ta lưu nó vào một hằng số để tải xuống và xử lý tệp sau này

  const task = final.put(file);

  task.on(

    'state_changed',

    // Hàm tiến trình

    function progress(progress) {

      console.log((progress.bytesTransferred / progress.totalBytes) * 100);

    },

    function error(err) {

      console.log('Đã xảy ra lỗi: ' + err);

    },

    function completed() {

      final

        .getDownloadURL()

        // Trả về một promise

        .then(url => {

          // Chọn thẻ div và thêm thẻ img với URL của ảnh

          document.querySelector('div').innerHTML = `<img src=${url} style='height:100%;width:100%;'/>`;
          document.getElementById('infoanh').style = 'display:block';

        });

    }

  );

});
