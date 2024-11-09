import React from "react";
import Navbar from "../navbar/navbar";
import SearchBar from "./searchbar";
import Waves from "../../assets/wave";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="section1">
        <div className="content-container">
          <div className="Text">
            <h1 className="title">Shop Like a Superhero</h1>
            <p className="undertitle">
              AI-powered. Clutter-free. Lightning-fast.
            </p>
          </div>
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
        <Waves />
      </div>

      <div className="section2">
        <div className="container-sec2">
          <img className="Rentimg" src="/gpugood.webp" alt="Gpu Img" />
          <div className="RentContent">
            <div className="Renttitle">
              <h2>Rent a GPU</h2>
            </div>

            {/* <h3>Rent a GPU</h3> */}
            <p>
              Renting a GPU is a great option if you need temporary access to
              powerful computing resources.
            </p>
            <p>
              Our platform offers a wide range of GPUs at competitive prices.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into el
            </p>

            <div className="buttons-container">
              <button className="secButton">Rent Now!</button>

              <a href="#" class="mainbutton">
                <span>Learn More</span>
                <i></i>
              </a>
            </div>
          </div>

          <div className="Hostimg">
            <img className="" src="/PCGPUHOST.png" alt="Miningrig Img" />
          </div>
          <div className="HostContent">
            <div className="Hosttitle">
              <h2>Host a GPU</h2>
            </div>

            {/* <h3>Host a GPU</h3> */}
            <p>
              Hosting a GPU allows you to earn passive income by sharing your
              computing power with others.
            </p>
            <p>
              Join our platform and become a part of our community of GPU hosts.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standar
            </p>

            <div className="buttons-container">
              <button className="secButton">Host Now!</button>

              <a href="#" class="mainbutton">
                <span>Learn More</span>
                <i></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section3">
        <div className="sec3title">
          <div>Competitive GPU Pricing</div>
        </div>

        <div className="price-table-container">
          <div className="grid-container">
            {/* Header */}
            <div className="grid-header model">
              <span>GPU Model</span>
            </div>
            <div className="grid-mega pyras">
              <img src="/SuperShopTextBlue.png" alt="Pyras" />
            </div>
            <div className="grid-header competitors">
              <span>Competitors</span>
            </div>

            <div className="data">
              {/* Row 1 */}
              <div className="grid-item">RTX 4090</div>
              <div className="grid-item glare-effect">$0.35/hr</div>
              <div className="grid-item">--</div>

              {/* Row 2 */}
              <div className="grid-item">RTX 3090</div>
              <div className="grid-item glare-effect">$0.18/hr</div>
              <div className="grid-item">--</div>

              {/* Row 3 */}
              <div className="grid-item">RTX A6000</div>
              <div className="grid-item glare-effect">$0.50/hr</div>
              <div className="grid-item">$0.80/hr (Lambda)</div>

              {/* Row 4 */}
              <div className="grid-item">RTX A5000</div>
              <div className="grid-item glare-effect">$0.15/hr</div>
              <div className="grid-item">$0.77/hr (AWS)</div>

              {/* Row 5 */}
              <div className="grid-item">A40</div>
              <div className="grid-item glare-effect">$0.12/hr</div>
              <div className="grid-item">$1.28/hr (AWS)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section4">
        <div class="border-wrap-last">
          <div class="border-wrap-outer">
            <div class="border-wrap-inner">
              <div className="contact">
                <h2>Contact</h2>
                <p>
                  Do you have GPU computing needs and want help deploying it on
                  our cost-effective infrastructure? Or just want to chat? We
                  are here to help! Let us know more about your project and we
                  can customize a solution to fit your needs.
                </p>
                <p>Email us at support@pyras.ai</p>
                <div className="contact-buttonn">
                  <button className="email-button">Email us!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
