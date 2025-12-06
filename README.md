
# **Quản Lý Học Sinh (React + Express + MongoDB)**

Dự án này là một ứng dụng CRUD đơn giản theo mô hình MERN để quản lý học sinh.

* **Frontend:** React (mẫu tối giản)
* **Backend:** Express + Mongoose
* **Database:** MongoDB (khuyến nghị chạy bằng Docker Compose)


## **Hướng dẫn chạy nhanh (local, không dùng Docker)**

1. Khởi động MongoDB trên máy bạn (hoặc dùng MongoDB cloud).
2. **Backend:**

   * `cd backend`
   * `npm install`
   * Tạo file `.env` (hoặc dùng `.env.example`) với biến `MONGO_URL`
   * `npm start`
3. **Frontend:**

   * `cd frontend`
   * `npm install`
   * `npm start`
4. Mở trình duyệt tại:
    [http://localhost:3000](http://localhost:3000)


## **Chạy bằng Docker Compose (khuyến nghị)**

Repo này có sẵn file `docker-compose.yml` ở thư mục gốc, dùng để:

* Khởi động container MongoDB
* Build và chạy container backend

**Cách chạy:**

1. Đảm bảo bạn đã cài Docker & Docker Compose.
2. Tại thư mục gốc dự án, chạy:

   ```
   docker-compose up --build
   ```
3. Backend sẽ hoạt động tại:
    `http://localhost:5000`
4. Frontend bạn có thể:

   * Chạy local: `cd frontend && npm install && npm start`, hoặc
   * Build và serve file tĩnh theo nhu cầu.


## **Lưu ý về Docker / Networking**

* Trong `docker-compose.yml`, backend dùng đường dẫn:

  ```
  mongodb://mongodb:27017/student_db
  ```

  vì backend container kết nối tới MongoDB qua **tên service Docker** là `mongodb`.
* Nếu bạn chạy backend *local* (không phải trong Docker), hãy dùng:

  ```
  mongodb://localhost:27017/student_db
  ```

  hoặc chỉnh lại `MONGO_URL` cho phù hợp.


## **Các thư mục và file đã tạo**

* `backend/` : Server Express, models, Dockerfile, `.env.example`
* `frontend/` : App React skeleton
* `docker-compose.yml` : Khởi chạy MongoDB + backend


