import React from 'react';
import './App.css';
import { useAppSelector } from './app/hooks';
import Cache from './components/cache/Cache';
import Search from './components/search/Search';
import Settings from './components/settings/Settings';
import { Slideshow } from './components/slideshow/Slideshow';
import View from './components/view/View';
import { selectScreen } from './slices/viewSlice';

function App() {
  const screen = useAppSelector(selectScreen);
  return (
    <div className="App">
      <Cache />
      <View visible={screen === 'slideshow'} ><Slideshow /></View>
      <View visible={screen === 'search'} ><Search /></View>
      <View visible={screen === 'settings'} ><Settings /></View>
    </div>
  );
}

export default App;
