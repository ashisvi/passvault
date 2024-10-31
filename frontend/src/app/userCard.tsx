import {DefaultSession} from "next-auth";


export function UserCard({ user }:{user:DefaultSession["user"]}) {
    return (
        <div className="card">
            <div className="card-body">
                <p >Current Logged in User</p>
                <h5 className="card-title">{user?.name}</h5>
                <p className="card-text">{user?.email}</p>
            </div>
        </div>
    )
}