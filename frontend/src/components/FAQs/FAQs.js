import React, { useState } from 'react';
import { Nav, Navbar, Form , Button , Container , Image } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import logo from "../assets/ParkEasy.png";
import './FAQs.css'; // Import your custom CSS file for styling

const FAQs = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (categoryIndex, questionIndex) => {
    setExpanded((prevExpanded) => {
      const expandedState = { ...prevExpanded };
      expandedState[categoryIndex] = expandedState[categoryIndex] === questionIndex ? null : questionIndex;
      return expandedState;
    });
  };

  const faqData = [
    {
      category: 'Drivers',
      questions: [
        {
          question: 'What are the parking rates?',
          answer: 'All parking rates are posted by the parking spot owner. We help guide owners in posting rates that are appropriate for the area and generally cheaper than the rates charged at public parking.',
        },
        {
          question: 'How do I pay for renting a space?',
          answer: 'Once you find your desired parking spot, you can select the book now option and it will direct you to the payment site and then you can enter your credit/debit card details for the payment.',
        },
        {
          question: 'Can I extend my stay?',
          answer: 'You may be able to extend your stay. Please contact the spot owner with your request.',
        },
        {
          question: 'How can I provide feedback on your products or services?',
          answer: 'We welcome your feedback! You can provide feedback by filling out the contact form on our website or by emailing us directly. We appreciate your input.',
        },
      ],
    },
    {
      category: 'Parking Spot Owners',
      questions: [
        {
          question: 'How do I rent my parking spot?',
          answer: 'Once you have registered an account with Parking For Me, click on List Your Spot button from the main menu and follow the instructions to enter your parking spot information. Once you have submitted your address, a ParkEasy staff member will either approve your listing or contact you if any additional information is required. Once your spot is listed, it will be available for rent.',
        },
        {
          question: 'When do I receive my payments and how do I get paid?',
          answer: 'It is the owners responsibility to check the payment details with the customer. Each customer shall be solely responsible for checking the details before sharing any confidential information and getting into a contract. The ParkEasy management will not accept responsibility for any loss or damage. We recommend not to accept cashier/certified checks or money orders. Also do not give out financial info (bank account, social security, PayPal account, etc.) unless you are 100% sure that it is not a scam.',
        },
        {
          question: 'How much does Parking For Me charge for listing my spot?',
          answer: 'Nothing! Listing is completely free. The rates that you choose to charge for your parking spot are the amounts you will receive when someone books your space.',
        },
        {
          question: 'How do I get parking spot access information to a driver?',
          answer: 'Whenever a renter will be interested in your parking spot, he/she will send you a request via our online contact form. You can then respond to that email or contact the renter on the phone number provided in the email and give them the detailed instructions. To preserve privacy, we will not display your personal information online.',
        },
      ],
    },
    // {
    //   category: 'Third party attributions',
    //   questions: [
    //     {
    //       question: 'Are there any ongoing promotions?',
    //       answer: 'Yes, we currently have a summer sale with discounts up to 40% off on selected packages.',
    //     },
    //     {
    //       question: 'How can I redeem a discount code?',
    //       answer: 'During the checkout process, you can enter your discount code in the designated field and click "Apply" to redeem it.',
    //     },
    //     {
    //       question: 'Are there any upcoming sales or promotions?',
    //       answer: 'We frequently run sales and promotions throughout the year. To stay updated, sign up for our newsletter or follow us on social media',
    //     },
    //     {
    //       question: 'Can I combine multiple discount codes?',
    //       answer: 'In general, our system allows the use of only one discount code per order. Multiple discount codes cannot be combined.',
    //     },
    //   ],
    // },
  ];

  return (
    <>
    <Navbar bg="success" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">
                <Image
                  src={logo}
                  style={{ width: "40px", height: "40px" }}
                  fluid
                ></Image>{" "}
                ParkEasy
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/support">Support</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <Tabs>
        <TabList>
          {faqData.map((category, index) => (
            <Tab key={index}>{category.category}</Tab>
          ))}
        </TabList>
        {faqData.map((category, categoryIndex) => (
          <TabPanel key={categoryIndex}>
            {category.questions.map((item, questionIndex) => (
              <div key={questionIndex} className="faq-item">
                <div
                  className={`faq-question ${expanded[categoryIndex] === questionIndex ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(categoryIndex, questionIndex)}
                >
                  {item.question}
                </div>
                {expanded[categoryIndex] === questionIndex && <div className="faq-answer">{item.answer}</div>}
              </div>
            ))}
          </TabPanel>
        ))}
      </Tabs>
    </div>
    </>
  );
};

export default FAQs;

