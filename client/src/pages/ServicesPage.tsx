import {  useOutletContext } from "react-router";

type ContextType = { activeChatId: string | null };


const ServicesPage = () => {

  const { activeChatId } = useOutletContext<ContextType>();
  

  console.log('activeChatId', activeChatId);

  return (
    <>
      {activeChatId ? (
      <div>Active Chat: {activeChatId}</div>
    ) : (
      <div>No active chat</div>
    )}
    </>
  )
}
export default ServicesPage