import { updateHistoryTitle } from "@/api";


const RenamingInput = ({ renameValue, setRenameValue, setRenamingId, conversation }  ) => {
  return (
     <input
    autoFocus
    value={renameValue}
    onChange={(e) => setRenameValue(e.target.value)}
    onFocus={(e) => e.target.select()} // auto-select text
    onBlur={async () => {
      await axiosApi.put(`/history/${conversation._id}`, { title: renameValue });
      setRenamingId(null);
    }}
    onKeyDown={async (e) => {
      if (e.key === 'Enter') {
        await updateHistoryTitle(conversation._id, renameValue);
        setRenamingId(null);
      } else if (e.key === 'Escape') {
        setRenamingId(null); // cancel
      }
    }}
    className="text-sm px-1 rounded border border-gray-300 focus:outline-none"
  />
)
  )
}
export default RenamingInput