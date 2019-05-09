Đây là hệ thống đơn giản, được sử dụng kỹ thuật sau:
Sử dụng SVM + ngrams + TFIDF để phân lớp data, từ đó predict vào nhóm xấu, tốt

Deploy :
+ Chạy file model.py để sinh ra model 
+ Có sẵn model dc pre-training là model.dat3
+ chạy flask api với file web_api
+ build create-react-app trong thư mục webapp : npm run build
+ set up thông số hệ thống trong file .env
+ cd webapp
+ node server/bin/www


