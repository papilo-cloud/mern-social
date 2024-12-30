import { Button, ButtonText } from "../Button/index"
import { follow, unfollow } from '../../../utils/api-user'

interface ButtonProps {
    following: boolean
    onButtonClick: (val) => any
}
const FollowProfButton = ({following, onButtonClick}: ButtonProps) => {
    const followClick = () => {
        onButtonClick(follow)
    }

    const unFollowClick = () => {
        
        onButtonClick(unfollow)
    }

  return (
    <>
        {
        following ? (
            <Button 
                className="bg-orange-500"
                onClick={unFollowClick}>
                <ButtonText>unfollow</ButtonText>
            </Button>
        ) : (
            <Button
                className="bg-green-500" 
                onClick={followClick}>
                <ButtonText>follow</ButtonText>
            </Button>
        )
    }
    </>
  )
}

export default FollowProfButton