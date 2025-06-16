// composables/useCharacterStore.js
import { ref } from 'vue'
import { db } from '@/firebase'
import { collection, addDoc, doc, getDocs } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

// Firestore collections
const characterCol = collection(db, 'character')
const commentCol = collection(db, 'comment')

export function useCharacter() {
  const characters = ref([])

  // 2. 新增 comment（並綁定 character reference）
  const postComment = async ({ comment, dbName, characterRef }) => {
    const id = uuidv4()

    await addDoc(commentCol, {
      id,
      comment,
      db: dbName,
      character_id: characterRef,
    })
  }

  // 3. 取得所有 character 資料
  const getCharacters = async () => {
    const snapshot = await getDocs(characterCol)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  }

  return {
    // characters,
    getCharacters,
    // postCharacter,
    // postComment,
  }
}
