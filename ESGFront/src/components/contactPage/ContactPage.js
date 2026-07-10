import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppHeader from "../appHeader/AppHeader";
import AppFooter from "../appFooter/AppFooter";
import "./contactPage.scss";
function ContactPage() {
  return (
    <div>
      <AppHeader />
      <div className="contact">
        <div className="contact__title">Контакты</div>
        <Container>
          <Row>
            <Col md={4}>
              <div className="contact__block">
                <div className="contact__block__info">
                  <ul>
                    <li className="contact__block__info__title">ESG CAMPUS</li>
                    <li className="contact__block__info__contact">
                      Контактные данные
                    </li>
                    <li className="contact__block__info__infor">
                      +7 (777) 777 77 77
                    </li>
                    <li className="contact__block__info__infor">
                      esglab@kbtu.kz
                    </li>
                    <li className="contact__block__info__infor">
                      Улица Толе би, 59
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <AppFooter />
    </div>
  );
}

export default ContactPage;
