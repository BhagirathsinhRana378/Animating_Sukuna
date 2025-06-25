import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function App() {


  let [showContent, setShowContent] = useState(false);


  useGSAP(() => {

    const tl = gsap.timeline();



    // GSAP animation to rotate and scale the text mask
    // and then remove the SVG element after the animation completes


    tl.to('.mask-group', {
      rotate: 50,
      delay: 0.3,
      duration: 2,
      ease: 'power4.easeOut',
      transformOrigin: '60% 60%',

    })
      .to('.mask-group', {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: 'Expo.easeInOut',
        transformOrigin: '50% 50%',
        opacity: 0,

        onUpdate: function () {
          if (this.progress() > 0.8) {
            // Remove the SVG element after the animation completes
            document.querySelector('.svg').remove();
            setShowContent(true);
            this.kill(); // Stop the animation
          }
        }

      })

  });
  useGSAP(() => {
    if (!showContent) return;

    // Animate main container: smooth scale/rotate in with slight overshoot for a dynamic effect
    gsap.fromTo(
      ".main",
      { scale: 1.3, rotate: -10 },
      {
        scale: 1,
        rotate: 0,
        duration: 1.5,
        delay: 0.1,
        ease: "power4.out",
      }
    );

    // Sky: parallax scale/rotate with fade-in for depth
    gsap.fromTo(
      ".sky",
      { scale: 1.6, rotate: -20, opacity: 0 },
      {
        scale: 1.15,
        rotate: 0,
        opacity: 1,
        duration: 2.2,
        delay: 0.3,
        ease: "expo.out",
      }
    );

    // Background: subtle scale/rotate, fade-in, slightly slower for layering
    gsap.fromTo(
      ".bg",
      { scale: 1.8, rotate: -25, opacity: 0 },
      {
        scale: 1.12,
        rotate: 0,
        opacity: 1,
        duration: 2,
        delay: 0.5,
        ease: "expo.out",
      }
    );

    // Character: pop-in with upward motion and fade
    gsap.fromTo(
      ".My_Character",
      { y: 200, opacity: 0, scale: 1.1 },
      {
        y: 10,
        opacity: 1,
        scale: 1.2,
        duration: 1.5,
        delay: 1,
        ease: "back.out(1.7)",
      }
    );
    // Bottom bar: smooth upward slide and fade-in with slight overshoot for a lively entrance
    gsap.fromTo(
      ".btmbar",
      {opacity: 0 },
      {
    
      opacity: 1,
      duration: 1.2,
      delay: 2,
      ease: "back.out(1.5)",
      }
    );

    // Text: fade and slide in
    gsap.fromTo(
      ".text_div",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 1.5,
        ease: "power3.out",
        stagger: 0.15,
      }
    );
  }, [showContent]);

  useGSAP(() => {
    const main = document.querySelector('.main');

    function handleMouseMove(e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      const yMove = (e.clientY / window.innerWidth - 0.5) * 40;
      gsap.to(".img_div .text_div", {
        x: `${xMove * 1}%`,
        y: `${yMove * 0.2}%`,
      });
      gsap.to(".img_div .sky", {
        x: xMove * 1,
        y: yMove * 2.5,
      });
      gsap.to(".img_div .bg", {
        x: xMove * 0.7,
        y: yMove * 1.5,
      });
      gsap.to(".img_div .My_Character", {
        x: xMove * 0.1,
        y: yMove * 0.2,
      });
    }

    if (main) {
      main.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup event listener on unmount or dependency change
    return () => {
      if (main) {
        main.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [showContent]);




  return (
    <>
      <div className="svg fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000000]">
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id='mask'>
              <rect width="100%" height="100%" fill="black" />
              <g className='mask-group'>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="100" fontFamily="Arial black">SUKUNA</text>
              </g>
            </mask>
          </defs>
          <image href='/bg.png'
            width="100%"
            height="100%"
            preserveAspectRatio='xMidYMid slice'
            mask='url(#mask)' />
        </svg>
      </div>

      {showContent && (
        <div className='main w-full rotate-[-10deg]  overflow-x-hidden scale-[1.6]'>
          <div className="landing overflow-x-hidden relative w-full h-screen bg-black">
            <div className="nav-bar absolute top-0 left-0 z-[10] w-full py-5 px-10">
              <div className="logo flex items-center gap-2">
                <div className="lines flex flex-col gap-1">
                  <div className="line w-20 h-2 bg-white"></div>
                  <div className="line w-14 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                </div>
                <h3 className='text-4xl text-white'>呪術廻戦</h3>
              </div>

            </div>
            <div className="img_div relative w-full h-screen overflow-hidden">

              <img className="sky absolute scale-[1.6] rotate-[-20deg] top-0 left-0 w-full h-full object-cover" src="./sky_2.png" alt="" />
              <img className=" bg absolute scale-[1.8] rotate-[-10deg] top-0 left-0 w-full h-full object-cover" src="./bg.png" alt="" />


              <div className="text_div absolute top-20 left-80 flex flex-col gap-4 text-white">
                <h1 className='text-[10rem] ml-20'>JUJUTSU</h1>
                <h1 className='text-[11rem] -ml-25'>KAISEN</h1>
              </div>

              <img className="My_Character absolute -bottom-[8%] left-[30%] scale-[1.2] object-cover  overflow-hidden"
                src="./M-3.png" alt="Sukuna" />




            </div>
            <div className="btmbar absolute bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center  gap-4">
                <h3 className='text-white text-2xl '>↓</h3>
                <h3 className='text-white text-1xl font-serif '>Scroll Down</h3>
              </div>
            </div>
          </div>

          <div className="2_page w-full h-screen flex px-10 items-center justify-center bg-black">


            <div className="contnr w-full flex h-[80%] ">

              <div className="left_img relative w-1/2 h-full">

                <img className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 " src="./img---2.webp" alt="" />

              </div>

              <div className="right_side  w-[50%] h-full mt-10 ml-10">
                <h1 className="text-white text-6xl">JUJUTUS KAISEN</h1>
                <h1 className="text-white text-6xl">DEMON-|SUKUNA|</h1>
                <p className="text-white text-[1.2rem] font-light mt-10 font-mono">Sukuna, the King of Curses from Jujutsu Kaisen, is a legendary sorcerer feared for his immense power, ruthless personality, strategic brilliance, and overwhelming dominance in cursed energy battles.</p>

                <p className="text-white text-[1.2rem] font-light mt-5 font-mono">Sukuna was once a human sorcerer turned curse after death. He has four arms, two faces, and seeks chaos, destruction, and total control over Jujutsu society.</p>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
export default App