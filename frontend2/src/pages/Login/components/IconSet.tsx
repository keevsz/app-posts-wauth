import { Icon, IconButton } from '../../../styled-components/Usual'
import google_icon from '../../../assets/google_icon.png'
import facebook_icon from '../../../assets/facebook_icon.png'
import twitter_icon from '../../../assets/twitter_icon.png'
import { Row } from '@/styled-components'

const IconSet = () => {
  return (
    <Row>
      <IconButton href="/api/user/login/google">
        <Icon
          type={'icon1'}
          width="15rem"
          height="1rem"
          loading="eager"
          alt="google_icon"
          src={google_icon}
        ></Icon>
      </IconButton>
      <IconButton href="#">
        <Icon
          type={'icon1'}
          width="15rem"
          height="1rem"
          loading="eager"
          alt="facebook_icon"
          src={facebook_icon}
        ></Icon>
      </IconButton>
      <IconButton href="#">
        <Icon
          type={'icon1'}
          width="15rem"
          height="1rem"
          loading="eager"
          alt="twitter_icon"
          src={twitter_icon}
        ></Icon>
      </IconButton>
    </Row>
  )
}

export default IconSet
