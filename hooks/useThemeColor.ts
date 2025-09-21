import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: {
    light?: string;
    dark?: string
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
    colorBrightness?: keyof typeof Colors.light.accent & keyof typeof Colors.dark.accent
  },
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    if (!props.colorBrightness) props.colorBrightness = 900;
    return Colors[theme][props.colorName][props.colorBrightness];
  }
}