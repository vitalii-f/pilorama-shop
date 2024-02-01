import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const ViewAll = () => {
  return (
    <button className={styles.button_view}>
        <Link href='/'>View All +</Link>
    </button>
  )
}

export default ViewAll