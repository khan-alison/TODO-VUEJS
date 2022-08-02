import {defineAbility} from '@casl/ability'

const abilityRoles = (role,authID) =>{
    return defineAbility((can,cannot)=>{
        switch(role){
            case "guest":
                break
            case "staff":
                can('view', 'Task', {assign: authID})
                can('read','Task')
                can('active','Task')
                can('update', 'Password')

                break
            case "admin":
                can('view', 'Task')
                can('read', 'Task')
                can('active', 'Task')
                can('delete', 'Task')
                can('update', 'Task')
                can('create', 'Task')
                cannot('update', 'Password')

                break
        }
    })
}

export {abilityRoles}