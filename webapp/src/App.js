import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  Card, CardBody, CardGroup, Col, Container, Form, Button, Input, Row , Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';
import { Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { predictReview } from './services'
import logo from './logo.svg';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowLogin: false,
      currReview : '',
      prediction : '',
      stylePredict : ''
    }

  }

  doPredict() {
    const review = ReactDOM.findDOMNode(this.review).value || '';
    return predictReview(review).then( result => {
      let prediction, stylePredict;
      if(result.res == 'GOOD'){
        prediction = 'Tốt'
        stylePredict = 'predict-ok-style'
      }else if(result.res == 'BAD'){
        prediction = 'Không Tốt'
        stylePredict = 'predict-notok-style'
      }else {
        prediction = 'Không Xác Định'
        stylePredict = ''
      }

      this.setState({
        isShowLogin : true,
        currReview : review,
        prediction,
        stylePredict
      })
    })
  }

  render () {
    return (
      <div className="App">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody className="text-center">
                    <Form>
                      <h1>Phân loại sắc thái bình luận một mặt hàng trên sendo</h1>
                      <p className="text-muted">
                        Nhập đoạn text cần phân tích cảm xúc
                      </p>
                      <p>
                      <Input type="textarea" rows="9" className="text-area-style" placeholder="Sản phẩm này như cứt ...." autoFocus ref={ref => this.review = ref} />
                      </p>
                      <Button className="btn btn-primary button-style" onClick={() => this.doPredict()}>Dự đoán</Button>
                    </Form>
                  </CardBody>
                  <hr className="hr_style"/>
                  <CardBody className="rs-style">
                    {'Kết quả dự đoán: '}<strong className={this.state.stylePredict}>{this.state.prediction}</strong>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
