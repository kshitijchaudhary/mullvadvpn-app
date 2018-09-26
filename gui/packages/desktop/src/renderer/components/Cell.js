// @flow

import * as React from 'react';
import { Button, Text, Component, Styles, Types, View } from 'reactxp';
import PlainImg from './Img';
import { colors } from '../../config';

const styles = {
  cell: Styles.createViewStyle({
    backgroundColor: colors.blue,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'default',
  }),
  cellContainer: Styles.createViewStyle({
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 12,
  }),

  footer: {
    container: Styles.createViewStyle({
      paddingTop: 8,
      paddingRight: 24,
      paddingBottom: 24,
      paddingLeft: 24,
    }),
    text: Styles.createTextStyle({
      fontFamily: 'Open Sans',
      fontSize: 13,
      fontWeight: '600',
      lineHeight: 20,
      letterSpacing: -0.2,
      color: colors.white80,
    }),
  },

  cellHover: Styles.createViewStyle({
    backgroundColor: colors.blue80,
  }),
  icon: Styles.createViewStyle({
    color: colors.white60,
    marginLeft: 8,
  }),

  label: Styles.createTextStyle({
    color: colors.white,
    alignSelf: 'center',
    fontFamily: 'DINPro',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    flex: 1,
    marginLeft: 8,
  }),
  subtext: Styles.createTextStyle({
    color: colors.white60,
    fontFamily: 'Open Sans',
    fontSize: 13,
    fontWeight: '800',
    flex: 0,
    textAlign: 'right',
  }),
};

export class SubText extends Text {}
export class Label extends Text {}
export class Img extends PlainImg {}

type CellButtonProps = {
  children?: React.Node,
  disabled?: boolean,
  cellHoverStyle?: Types.ViewStyle,
  style?: Types.ViewStyle,
};

type State = { hovered: boolean };

export class CellButton extends Component<CellButtonProps, State> {
  state = { hovered: false };

  textStyle = (cellHoverStyle?: Types.ViewStyle) => (this.state.hovered ? cellHoverStyle : null);
  iconStyle = (cellHoverStyle?: Types.ViewStyle) => (this.state.hovered ? cellHoverStyle : null);
  subtextStyle = (cellHoverStyle?: Types.ViewStyle) => (this.state.hovered ? cellHoverStyle : null);
  backgroundStyle = (cellHoverStyle?: Types.ViewStyle) =>
    this.state.hovered ? cellHoverStyle || styles.cellHover : null;

  onHoverStart = () => (!this.props.disabled ? this.setState({ hovered: true }) : null);
  onHoverEnd = () => (!this.props.disabled ? this.setState({ hovered: false }) : null);

  render() {
    const { children, style, cellHoverStyle, ...otherProps } = this.props;
    return (
      <Button
        style={[styles.cell, style, this.backgroundStyle(cellHoverStyle)]}
        onHoverStart={this.onHoverStart}
        onHoverEnd={this.onHoverEnd}
        {...otherProps}>
        {React.Children.map(children, (node) => {
          if (React.isValidElement(node)) {
            let updatedProps = {};

            if (node.type === Label) {
              updatedProps = {
                style: [styles.label, node.props.style, this.textStyle(node.props.cellHoverStyle)],
              };
            }

            if (node.type === Img) {
              updatedProps = {
                tintColor: 'currentColor',
                style: [styles.icon, node.props.style, this.iconStyle(node.props.cellHoverStyle)],
              };
            }

            if (node.type === SubText) {
              updatedProps = {
                style: [
                  styles.subtext,
                  node.props.style,
                  this.subtextStyle(node.props.cellHoverStyle),
                ],
              };
            }

            return React.cloneElement(node, updatedProps);
          } else if (node) {
            return <Label style={[styles.label, this.textStyle()]}>{children}</Label>;
          }
        })}
      </Button>
    );
  }
}

type ContainerProps = { children: React.Node };

export function Container({ children }: ContainerProps) {
  return <View style={styles.cellContainer}>{children}</View>;
}

export function Footer({ children }: ContainerProps) {
  return (
    <View style={styles.footer.container}>
      <Text style={styles.footer.text}>{children}</Text>
    </View>
  );
}
