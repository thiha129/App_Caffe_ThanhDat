import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Transition, Transitioning } from 'react-native-reanimated';

import Images from '../images';

const bgColors: any = {
  home: '#009387',
  logger: '#009387',
  documents: '#009387',
  menu: '#009387',
};
const textColors: any = {
  home: '#fff',
  logger: '#fff',
  documents: '#fff',
  menu: '#fff',
};

const Container = styled.TouchableWithoutFeedback``;

const Background = styled(Transitioning.View)`
  flex: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props: any) => (props.focused ? bgColors[props.label] : 'white')};
  border-radius: 100px;
  margin: 3px;
`;
const Icon = styled.Image`
  height: 20px;
  width: 20px;
  tintColor: ${(props: any) => (props.focused ? textColors[props.label] : 'black')};
`;

const Label = styled.Text`
  color: white;
  fontSize: 12px;
  font-weight: bold;
`;

function Tab({ label, accessibilityState, onPress, name }: { label: any, accessibilityState: any, onPress: any, name: any }) {
  const focused = accessibilityState.selected;
  const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`];

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  );

  const ref = useRef();
  const trangchu = "Trang chủ"
  return (
    <Container
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}>
      <Background
        focused={focused}
        label={label}
        ref={ref}
        transition={transition}>
        <Icon source={icon}  focused={focused}
        label={label}/>
        {focused && (
          <Label label={label}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Label>
        )}
      </Background>
    </Container>
  );
}

export default Tab;
