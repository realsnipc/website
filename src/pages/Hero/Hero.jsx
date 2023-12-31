import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import Skeleton from 'react-loading-skeleton';
import pfp from '../../scripts/Effects';
import 'react-loading-skeleton/dist/skeleton.css';


// ..
AOS.init();

// main css 
import './Hero.css';
// 'pages' area css 
import './Pages.css';
// about me section 
import './About.css';


function Hero(props) {
  
  const [discord_state, setStatus] = useState(false);
  const [isDarkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    themeChange(false);
    if(localStorage.getItem('theme')=='dark'){
      setDarkTheme(true);
    }
    console.log(isDarkTheme)

    // fetch discord data from Lanyard 
setTimeout(() => {
  fetch("https://api.lanyard.rest/v1/users/1019641343875760350")
      .then((res) => res.json())
      .then((json) => {
        let data = json.data.discord_status;
        // Conditions respective to data recieved
        if (json.data.spotify != null) {
          setStatus(`Listening to ${json.data.spotify.song}`);
          document.getElementById('circle').style.display = 'none';
          document.getElementById('intro').style.display = 'flex';
          document.getElementById('spotify').style.display = 'inline';

        }
        else if (data == 'offline') {
          setStatus('Offline');
        }
        else if (data == 'online') {
          setStatus('Online');
          document.getElementById('circle').style.backgroundColor = 'rgb(121, 214, 121)';
        }
        else if (data == 'dnd') {
          setStatus('Busy');
          document.getElementById('circle').style.backgroundColor = 'rgb(212, 109, 109)';

        }
        else if (data == 'idle') {
          setStatus('AFK');
          document.getElementById('circle').style.backgroundColor = 'rgb(209, 209, 116)';

        }
      });
}, 0);
    
  }, []);

  var dob = new Date("09/02/2009");
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date    
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);



  var stylesObj = {
    backgroundColor: 'grey',
  };
  return (
    <>


        <title>Shaurya Chaudhary | snipc</title>

        <div className="container fade-in" >

          {/* here comes the text container  */}
          <div className="text" >
            {/* the text in bracket */}
            <h5 id="intro">
              <iconify-icon icon="logos:spotify-icon" id='spotify' height='1.4rem'></iconify-icon>
        
              &nbsp;

              {/* Loading skeleton for dark mode */}
              {
                (!discord_state && isDarkTheme) &&<span id='discord_s'><Skeleton containerClassName="flex-1" height={19} width={70} baseColor={'#2e2c2c'} highlightColor='#505050'/></span>
              }
              {/* Loading skeleton for light mode  */}
              {
                (!discord_state && !isDarkTheme) && <span id='discord_s'><Skeleton containerClassName="flex-1" height={19} width={70} /></span>
              }
              
              {/* Discord status  */}
             { discord_state &&<> <span id="circle" style={stylesObj}></span><span id='discord_s' data-tooltip-id="discord_status" className='fade-in'>{discord_state}</span>  </>
             }

              {/* discord status tooltip  */}
              <ReactTooltip
                id="discord_status"
                place="top"
                content="Discord Status"
                style={{ borderRadius: '10px', fontFamily: "'Work Sans', sans-serif" }}
              />
            </h5>
            {/* name and about me section  */}
            <h1 id='hello'>Hello, I'm <span id='Shaurya'>Shaurya</span></h1>
            <p id='about'>I'm a <b data-tooltip-id="dob">{age}</b> y/o fullstack developer from India. On the Internet, people call me snipc!</p>


            <ReactTooltip
              id="dob"
              place="top"
              content="9/02/2009"
              style={{ borderRadius: '10px', fontFamily: "'Work Sans', sans-serif" }}
            />


            {/* the social links section  */}
            {/* <div id="links">

  <a href="https://github.com/realsnipc" target="_blank"className="link"><iconify-icon icon="line-md:github-loop" className="icon"  height='1.5em' style={{color:'white'}}></iconify-icon></a>

  <a href="https://linkedin.com/in/realshaurya" target="_blank"className="link"  id="linkedin" ><iconify-icon icon="ri:linkedin-fill" height='1.5em'style={{color:'white'}}></iconify-icon></a>
</div> */}
          </div>
          {/* image container */}
          <div className="img">
            <img src={pfp} alt="My online avatar I use as an alternate to my real photo. " />
          </div>


        </div>

        {/* pages1 section (work & anime)  */}
        <div className="pages1">
          <div id="first" className='page'>
            <Link to="/work" style={{ textDecoration: 'none' }} preventScrollReset={false}>
              <h3>work</h3>
              <p>View my elegently crafted open-source and other awesome projects.</p>
            </Link>
          </div>


          <div id="second" className='page'>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <h3>contact</h3> <p>Wanna Chitchat? Stumped on a project? Just ask! I'm always happy to help out a friend in need.</p>
            </Link>
          </div>
        </div>

        {/* page2 secion */}
        <div className="pages2">
          {/* /donate  */}
          <div id="third" className='page'>
            <Link to="/support" style={{ textDecoration: 'none' }}>
              <h3>support</h3>
              <p>Support my work to help me create something that will blow up people's minds!</p>
            </Link>
          </div>

          {/* /stack   */}
          <div id="fourth" className='page'>
            <Link to="/stack" style={{ textDecoration: 'none' }}>
              <h3>stack</h3>
              <p>The tools that power my life and make me look like a genius (even though I'm not). </p>
            </Link>
          </div>
        </div>

        <p id='pages_title'>MORE</p>
        <div id="more_pages">
          <div id="first" className='page'>
            <Link to="https://www.last.fm/user/realsnipc" style={{ textDecoration: 'none' }} preventScrollReset={false}>
              <h3>songs</h3>
              <p>This button leads to songs I listen to when I'm coding, gaming, or just plain bored, so buckle up!</p>
            </Link>
          </div>

          <div id="second" className='page'>
            <Link to="/anime" style={{ textDecoration: 'none' }}>
              <h3>anime</h3> <p>The anime that I used to watch that make me feel like I can do anything.</p>
            </Link>
          </div>
        </div>

        <p id='pages_title' style={{ marginTop: '20vh' }}>ABOUT ME</p>
        <div id="about_me" data-aos="fadeInUp" data-aos-anchor=".other-element" >

          <p id="about_para">My name is <span id='Shaurya'>Shaurya</span>, and code is my jam. 
            <br /> <br /> When I'm not wrangling code, you can find me learning new things or doing random things (Sadly, free time's been a bit scarce lately!)
            <br /> <br />Brain wired for logic, heart fueled by innovation, I'm dancing with the future, one byte at a time.
</p>
          <img src="https://media.giphy.com/media/Y1IFN5kK9E7fO/giphy.gif" alt="some random anime gif" id='about_me_gif' />
        </div>
    </>
  );
}

export default Hero;
