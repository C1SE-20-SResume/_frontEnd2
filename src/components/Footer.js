import React from "react";
import {Link, NavLink} from "react-router-dom";
import Logo from "../assets/images/logo.png";
function Footer() {
  return (
    <>
      <div className="footer-2 bg-gray-200 pt-6 md:pt-12">
        <div className="container px-4 mx-auto">
          <div className="md:flex md:flex-wrap md:-mx-4 py-6 md:pb-12">
            <div className="footer-info lg:w-1/3 md:px-4">
              <img src={Logo} className="w-40" />
              <p className="text-gray-400 my-3">
                We have carefully crafted the blocks to suit to everyone's need.
              </p>
              <div className>
                <button className="bg-facebook py-2 px-4 text-white rounded mt-2 transition-colors duration-300">
                  <span className="fab fa-facebook-f mr-2" /> Follow
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 md:px-4">
              <div className="sm:flex text-left ">
                <div className="sm:flex-1 mt-4  sm:mt-0">
                  <h6 className="text-base font-bold text-black uppercase mb-2">
                    Member
                  </h6>
                  <div>
                    <span
                      href="#"
                      className="text-gray-400 py-1 block hover:underline"
                    >
                      Phan Duong Ngoc Do
                    </span>
                    <span
                      href="#"
                      className="text-gray-400 py-1 block hover:underline"
                    >
                      Nguyen Diem Hanh
                    </span>
                    <span
                      href="#"
                      className="text-gray-400 py-1 block hover:underline"
                    >
                      Nguyen Ngoc Thanh
                    </span>
                    <span
                      href="#"
                      className="text-gray-400 py-1 block hover:underline"
                    >
                      Dam Phuoc Manh
                    </span>
                    <span
                      href="#"
                      className="text-gray-400 py-1 block hover:underline"
                    >
                      Ngo V. Lam Truong
                    </span>
                  </div>
                </div>
                <div className="sm:flex-1 mt-4 px-3 box-border sm:mt-0">
                  <h6 className="text-base font-bold text-black uppercase mb-2">
                    Mentor
                  </h6>
                  <div>
                    <span
                      href="#"
                      className="text-gray-400 py-1 block hover:underline"
                    >
                      Nguyen Duc Man
                    </span>
                    <span
                      href="#"
                      className="text-gray-400 py-1 block hover:underline"
                    >
                      Ho Tan Dat
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0">
              <h5 className="text-lg text-black font-medium mb-4">
                Want to post a job? Contact us at:
              </h5>
              <span
                href="#"
                className="text-gray-400 py-1 block hover:underline"
              >
                Hotline: (+84) 123 456 789 <br /> Email: sresume@cvtojob.tk
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-solid border-gray-900 mt-4 py-4">
          <div className="container px-4 mx-auto">
            <div className="md:flex md:-mx-4 md:items-center">
              <div className="md:flex-1 md:px-4 text-center md:text-left">
                <p className="text-black">
                  © <strong>SRESUME</strong>
                </p>
              </div>
              <div className="md:flex-1 md:px-4 text-center md:text-right">
                <span className="py-2 px-4 text-black font-semibold text-xs inline-block ">
                  CAPSTONE 1
                </span>
                <a
                  href="#"
                  className="py-2 px-4 text-black font-semibold text-xs inline-block"
                >
                  Duy Tan Unieversity
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
