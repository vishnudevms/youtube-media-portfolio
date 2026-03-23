import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay,faCirclePause } from '@fortawesome/free-solid-svg-icons';
import girlImage from './images/shadow.png'
import song from './audios/song.wav'
import { useRef,useState,useEffect } from 'react';
import { RiForward10Fill,RiReplay10Fill } from "react-icons/ri";
import { HiMiniSpeakerWave } from "react-icons/hi2";

    const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
    
let Home=()=>{
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [episodes, setEpisodes] = useState([]);
    const [videoDetails, setVideoDetails] = useState([]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updateTime = () => setCurrentTime(audio.currentTime);
            const setAudioDuration = () => setDuration(audio.duration);

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', setAudioDuration);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', setAudioDuration);
            };
        }
    }, []);
    useEffect(() => {
    const fetchEpisodes = async () => {
      const res = await fetch("http://localhost:5000/api/episodes");
      const data = await res.json();
      setEpisodes(data);
    };
    fetchEpisodes();
  }, []);
    useEffect(() => {
    const fetchVideoDetails = async () => {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const ids = episodes
        .map(ep => getYouTubeVideoId(ep.youtubeUrl))
        .filter(Boolean)
        .join(",");
      if (!ids) {
        setVideoDetails([]);
        return;
      }
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids}&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setVideoDetails(data.items || []);
    };
    if (episodes.length > 0) fetchVideoDetails();
  }, [episodes]);
        return (
            <div className="background">
                <div className='alltext'>
                    <p className='mahalia'>Angel Is Live</p>
                    <p className='vanished'>Vanished. A True<br></br>Game Podcast.</p><br></br>
                    <p>Hey Guys, I'm a  Girl Streamer from KERALA<br></br> beginning to end. New episodes every Wednesday!</p>
                    <button type="button" className="btn primary">ALL LIVES</button>  
                    <button type="button" className="btn secondary">WATCH NOW</button>
                </div>
                <img className='newgirl' src={girlImage} alt='girl'/>
                <div className='audiobackground'>
                    <div className='playbuttons'>
                    <button
                        onClick={() => {
                            if (audioRef.current) {
                                const newTime = Math.max(0, currentTime - 10);
                                audioRef.current.currentTime = newTime;
                                setCurrentTime(newTime);
                            }
                        }}><RiReplay10Fill className='leftrotate'/>
                    </button>
                    <button onClick={handlePlayPause}><FontAwesomeIcon className='play' icon={isPlaying ? faCirclePause : faCirclePlay}/></button>
                    <button
                        onClick={() => {
                            if (audioRef.current) {
                                const newTime = Math.min(duration, currentTime + 10);
                                audioRef.current.currentTime = newTime;
                                setCurrentTime(newTime);
                            }
                        }}>< RiForward10Fill className='rightrotate'/>
                    </button>
                    <div className='timestamp'>
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <div className='bothcontrol'>
                    <input 
                        type="range"
                        className='forandback'
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={(e) => {
                        const newTime = e.target.value;
                        audioRef.current.currentTime = newTime;
                        setCurrentTime(newTime);
                        }}/>
                    <button className='audiocontrol'><HiMiniSpeakerWave/></button>
                    <div className='control-bar'>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={audioRef.current ? audioRef.current.volume : 1}
                        onChange={(e) => {
                        const newVolume = e.target.value;
                        audioRef.current.volume = newVolume;
                        }}/>
                    </div>
                    </div>
                    </div>
                    <audio ref={audioRef} src={song}></audio>
                </div>
                <div className='latesteptitles'>
                    <p className='start'>Start Watching Today</p> 
                    <p className='latest'>Latest Episodes</p>       
                </div>
                <div className='latestepflex'>
  {videoDetails.map((video, idx) => (
    <a
      key={video.id}
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="episode-card">
        <div className="episode-thumb">
          <img
            src={
              video.snippet.thumbnails.maxres?.url ||
              video.snippet.thumbnails.high?.url ||
              video.snippet.thumbnails.medium.url
            }
            alt={video.snippet.title}
          />
        </div>
        <div className="episode-info">
          {new Date(video.snippet.publishedAt).toLocaleDateString()}<br/>
          <h4 className="episode-title">{video.snippet.title}</h4>
          <p style={{ color: "#aaa" }}></p>
        </div>
      </div>
    </a>
  ))}
</div>
        </div>
        );
      };
export default Home;