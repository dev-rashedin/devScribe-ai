import { updateHistoryTitle } from '../../api';

const RenamingInput = ({
  renameValue,
  setRenameValue,
  setRenamingId,
  id,
  refetch,
}: {
  renameValue: string;
  setRenameValue: React.Dispatch<React.SetStateAction<string>>;
  setRenamingId: React.Dispatch<React.SetStateAction<string | null>>;
  id: string;
  refetch: () => void;
}) => {
  return (
    <input
      autoFocus
      value={renameValue}
      onChange={(e) => setRenameValue(e.target.value)}
      onFocus={(e) => e.target.select()}
      onBlur={async () => {
        await updateHistoryTitle(id, renameValue);
        refetch();
        setRenamingId(null);
      }}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await updateHistoryTitle(id, renameValue);
          refetch();
          setRenamingId(null);
        } else if (e.key === 'Escape') {
          setRenamingId(null);
        }
      }}
      className='text-sm px-1 rounded border border-gray-300 focus:outline-none'
    />
  );
};
export default RenamingInput;
