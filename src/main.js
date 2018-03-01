import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ChartComponent from './stock'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const overlayStyle = {
  float: 'left',
  margin: '0em 3em 1em 0em',
}

const fixedOverlayStyle = {
  ...overlayStyle,
  position: 'fixed',
  top: '80px',
  zIndex: 10,
}

const overlayMenuStyle = {
  position: 'relative',
  left: 0,
  transition: 'left 0.5s ease',
}

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: '800px',
}

const LeftImage = () => (
  <Image
    floated='left'
    size='medium'
    src='/assets/images/wireframe/square-image.png'
    style={{ margin: '2em 2em 2em -4em' }}
  />
)

const RightImage = () => (
  <Image
    floated='right'
    size='medium'
    src='/assets/images/wireframe/square-image.png'
    style={{ margin: '2em -4em 2em 2em' }}
  />
)

const Paragraph = () => (
  <p>
    {[
      '不曾有過的風景 ',
      '環繞你身旁 ',
    ].join('')}
  </p>
)

export default class StickyLayout extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  }

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state

    if (!overlayRect) this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
  }

  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state

    return (
      <div>
        {/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */}
        <style>{`
          html, body {
            background: #fff;
          }
        `}</style>

        <Container text style={{ marginTop: '2em' }}>
          <Header as='h1'>股市標的</Header>
          <p>這裡能快速地進行看盤、尋找相關新聞、以及進行買賣點分析</p>
        </Container>

        {/* Attaching the top menu is a simple operation, we only switch `fixed` prop add add another styles if it has
            gone beyond the scope of visibility
          */}
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed && 'top'}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container text>
              <Menu.Item>
                <Image size='mini' src='/stock up.png' />
              </Menu.Item>
              <Menu.Item header>股市行情</Menu.Item>
              <Menu.Item as='a'>新聞</Menu.Item>
              <Menu.Item as='a'>分析文章</Menu.Item>

              <Menu.Menu position='right'>
                <Dropdown text='其他功能' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Header Item</Dropdown.Header>
                    <Dropdown.Item>
                      <i className='dropdown icon' />
                      <span className='text'>Submenu</span>
                      <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

        <Container text>
          {/* { _.times(3, i => <Paragraph key={i} />) } */}

          {/* Example with overlay menu is more complex, SUI simply clones all elements inside, but we should use a
              different approach.
              An empty Visibility element controls the need to change the fixing of element below, it also uses height
              and width params received from its ref for correct display.
            */}
          <Visibility
            offset={80}
            once={false}
            // onTopPassed={this.stickOverlay}
            onTopVisible={this.unStickOverlay}
            style={overlayFixed ? { ...overlayStyle, ...overlayRect } : {}}
          />

          <ChartComponent />

          <div
            ref={this.handleOverlayRef}
            // style={overlayFixed ? fixedOverlayStyle : overlayStyle}
            style={fixedOverlayStyle}
          >
            <Menu
              icon='labeled'
              //style={overlayFixed ? fixedOverlayMenuStyle : overlayMenuStyle}
              style={fixedOverlayMenuStyle}
              vertical
            >
              <Menu.Item>
                <Icon name='twitter' />
               Twitter
              </Menu.Item>

              <Menu.Item >
                <Icon name='facebook' />
               Share
              </Menu.Item>

              <Menu.Item>
                <Icon name='mail' />
               Email
              </Menu.Item>
            </Menu>
          </div>

          {/* { _.times(3, i => <Paragraph key={i} />) } */}
          <Paragraph />
          
          {/* <LeftImage /> */}
        </Container>

        <Segment
          inverted
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          vertical
        >
          <Container textAlign='center'>
            <Grid columns={4} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Group 1' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Group 2' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Group 3' />
                  <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                    <List.Item as='a'>Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Footer Header' />
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Image src='/stock up.png' centered size='mini' />
            <List horizontal inverted divided link>
              <List.Item as='a' href='#'>Site Map</List.Item>
              <List.Item as='a' href='#'>Contact Us</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    )
  }
}