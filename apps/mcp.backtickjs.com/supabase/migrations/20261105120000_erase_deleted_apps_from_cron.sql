-- Deleted apps are erased by app.backtickjs.com's daily cron instead
-- (`eraseDeletedApps`), with their previews: those are files in storage, which
-- only its API deletes, so SQL can't erase an app whole.
select cron.unschedule('erase-deleted-apps');
