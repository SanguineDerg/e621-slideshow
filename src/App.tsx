import React from 'react';
import './App.css';
import { useAppSelector } from './app/hooks';
import About from './components/about/About';
import Cache from './components/cache/Cache';
import { Gallery } from './components/gallery/Gallery';
import Search from './components/search/Search';
import Settings from './components/settings/Settings';
import { Slideshow } from './components/slideshow/Slideshow';
import View from './components/view/View';
import { Welcome } from './components/welcome/Welcome';
import { selectWelcomeTutorial } from './slices/tutorialSlice';
import { selectScreen } from './slices/viewSlice';

function App() {
  const screen = useAppSelector(selectScreen);
  const welcome = useAppSelector(selectWelcomeTutorial);
  return (
    <div className="App">
      {welcome && 
        <View visible={true} ><Welcome /></View>
      }
      {!welcome &&
        <>
          <Cache />
          <View disabled={screen !== 'slideshow'} ><Slideshow /></View>
          <View disabled={screen !== 'gallery'} ><Gallery /></View>
          <View visible={screen === 'search'} ><Search /></View>
          <View visible={screen === 'settings'} ><Settings /></View>
          <View visible={screen === 'about'} ><About /></View>
        </>
      }
    </div>
  );
}

export default App;
